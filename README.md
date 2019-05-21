# Declare QA

![Declare QA Logo](https://raw.githubusercontent.com/jaredloomis/declare/master/assets/dist/declare_logo_banner.png)

**Declare QA** makes it easy for anyone to create robust website tests without code!
Declare's powerful visual interface handles the details of creating dependable tests, so
you can focus on testing the functionality of your product.

Most automated testing platforms provide little in the way of test maintenance tools. Tests
break often and are time consuming to repair, wasting time that could be spent creating new
tests. This leads to many automation projects falling into a cycle of perpetual maintenance,
unable to test new functionality without losing coverage to flakiness.

Declare solves this by introducing tools for reducing duplicated functionality and improving
organization of tests.

### Powerful Page Navigation

![Declare Page Link](https://raw.githubusercontent.com/jaredloomis/declare/master/assets/dist/screenshot_page_view_link.png)

Declare eliminates the need for writing test steps to navigate between pages. With the concept
of links between pages, you describe how to get from page to page. Declare handles the rest.

### Intuitive Page-Based Test Management

![Declare Page List](https://raw.githubusercontent.com/jaredloomis/declare/master/assets/dist/screenshot_page_list.png)

With Declare, organizing your tests cases is dead simple, even as these test cases grow. Tests
are grouped by page for automatic organization.

### Stable Tests with the Power of Saved Elements Selectors

![Declare Elements](https://raw.githubusercontent.com/jaredloomis/declare/master/assets/dist/screenshot_elements.png)

Declare's saved elements make test maintenance a snap! Element selectors are stored in an
organized list, which is customizable to allow for increased clarity.

# Installation

The typical installation architecture of the application spans two remote servers
(EC2 instances, for example), with a third acting as a database. This is optional; all 3
components may be installed on a single machine.

## Declare Common

Declare Common contains code shared amongst Declare's components. For any component requiring
Declare Common, ensure the `common` folder is in the same folder as the component, and build the
common code.

```
| common
| | src
| | dist
| component
| | src
| | ...
```

Build the common code by executing `yarn run build` in the `common` directory.

## Declare DB

The DB component is also shared code. Install with `yarn run build` if needed.

## Declare Server

**Dependencies:**

- `Node.js`
- `RabbitMQ` running on standard port
- `gulp` installed globally
- `yarn` installed globally

To start the server, install its dependencies, build the code, and run it.

```bash
$ cd server
$ yarn             # Install dependencies & build
$ yarn run start   # Start server with forever

# The server can be restarted or stopped
$ yarn run restart
$ yarn run stop
```

## Test Executor

TODO

## React Frontend

TODO
