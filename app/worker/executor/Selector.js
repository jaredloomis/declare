// @flow

export type Selector = CSSSelector | XPathSelector | string

export type CSSSelector = {|
    css: string
|}

export type XPathSelector = {|
    xpath: string
|}

export function showSelector(selector: Selector): string {
    if(typeof(selector) === "string") {
        return selector
    } else {
        return selector.css || selector.xpath ||
               `ERROR NOT A VALID SELECTOR ${JSON.stringify(selector)}`
    }
}
