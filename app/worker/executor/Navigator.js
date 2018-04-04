// @flow
import Promise from "bluebird"
import {List, Map} from "immutable"
import Runner from "./Runner"
import {runAction} from "./ActionStepper"
import Page from "../../model/Page"

type PageID = string
export type PageGraph = Map<PageID, Map<PageID, List<any>>>

export default class Navigator {
    runner: Runner
    currentPage: string
    pageGraph: PageGraph

    constructor(runner: Runner) {
        this.runner    = runner
    }

    async init() {
        const pages = List(await Page.find({}, {_id: true, links: true}))
        this.pageGraph = createPageGraph(pages)
    }

    async inferCurrentPage() {
        const pages = await Page.find({}, {_id: true, identifier: true})
        for(const page of pages) {
            const {identifier, _id} = page
            if(await this.runner.exists(identifier)) {
                this.currentPage = _id.toString()
                return
            }
        }
    }

    async findRoots(target: ?string) {
        const roots = await Page.find({startURL: {$exists: true}})

        if(target) {
            return roots
            .filter(root => {
                if(root.startURL.length === 0) return false
                const path = findPath(this.pageGraph, root._id.toString(), target)
                return path.size > 1
            })
        } else {
            return roots
        }
    }

    async navigateTo(pageID: string) {
        const actions = findPathActions(this.pageGraph, this.currentPage, pageID)
        for(const action of actions) {
            await runAction(this.runner, action)
        }
        this.setPage(pageID)
    }

    pathTo(pageID: string): List<string> {
        return findPathActions(this.pageGraph, this.currentPage, pageID)
    }

    setPage(pageID: string) {
        this.currentPage = pageID
    }

    getPage(): string {
        return this.currentPage
    }
}

const createPageGraph = (pages: List<any>): PageGraph => {
    return pages.reduce((pagesAcc, page) => {
        const linkMap = List(page.links).reduce((linksAcc, link) => {
            return linksAcc.set(link.destination.toString(), link.navigation)
        }, Map())
        return pagesAcc.set(page._id.toString(), linkMap)
    }, Map())
}

// -> List Action
const findPathActions = (pageGraph: PageGraph, start: string, finish: string) => {
    // Find the pages we need to go through to get from start to finish
    const path = findPath(pageGraph, start, finish)
    // Collect corresponding actions
    let prevPage = start
    return path.splice(0, 1).flatMap(curPage => {
        const ret = pageGraph.getIn([prevPage, curPage], List())
        prevPage = curPage
        return ret
    })
}

// -> List PageID
const findPath = (graphData: any, start: string, finish: string) => {
    if(start === finish) {
        return List()
    }

    const graph = graphData.reduce((graphAcc, edges, pageID) => {
        const cleanedEdges = edges.reduce((acc, steps, dest) => {
            return acc.set(dest, steps.length)
        }, Map()).toJS()
        graphAcc.addVertex(pageID, cleanedEdges)
        return graphAcc
    }, new Graph())
    return List(graph.shortestPath(start, finish)).reverse().unshift(start)
}

/**
 * Basic priority queue implementation. If a better priority queue is wanted/needed,
 * this code works with the implementation in google's closure library (https://code.google.com/p/closure-library/).
 * Use goog.require('goog.structs.PriorityQueue'); and new goog.structs.PriorityQueue()
 */
function PriorityQueue () {
  this._nodes = [];

  this.enqueue = function (priority, key) {
    this._nodes.push({key: key, priority: priority });
    this.sort();
  };
  this.dequeue = function () {
    return this._nodes.shift().key;
  };
  this.sort = function () {
    this._nodes.sort(function (a, b) {
      return a.priority - b.priority;
    });
  };
  this.isEmpty = function () {
    return !this._nodes.length;
  };
}

/**
 * Pathfinding starts here
 */
function Graph(){
  var INFINITY = 1/0;
  this.vertices = {};

  this.addVertex = function(name, edges){
    this.vertices[name] = edges;
  };

  this.shortestPath = function (start, finish) {
    var nodes = new PriorityQueue(),
        distances = {},
        previous = {},
        path = [],
        smallest, vertex, neighbor, alt;

    for(vertex in this.vertices) {
      if(vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      }
      else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while(!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      if(smallest === finish) {
        path = [];

        while(previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }

        break;
      }

      if(!smallest || distances[smallest] === INFINITY){
        continue;
      }

      for(neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor];

        if(alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;

          nodes.enqueue(alt, neighbor);
        }
      }
    }

    return path;
  };
}
