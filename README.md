# Declare QA

![Declare QA Logo](https://raw.githubusercontent.com/jaredloomis/declare/master/assets/dist/declare_logo_banner.png)

**Declare QA** makes it easy for anyone to create robust website tests without code!
Declare's powerful visual interface handles the details of creating dependable tests, so
you can focus on testing the functionality of your product.

**Demo:** [declare.jaredloomis.com](http://declare.jaredloomis.com/#SignUp)

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

# Simple Installation

Declare can be installed on multiple nodes as a distributed system, but can be
easily installed on any compute, whether in the cloud or on a physical machine.

The "full" installation architecture of the application comprises two node types
(running on EC2 instances, for example), with a third acting as a database.

This document describes how to install all components on a single system.

**Installing Dependencies**

- `nginx` running as a service (`systemctl start nginx`)
- `mongodb` running as a service (`systemctl start mongodb`)
- `node` installed and in `PATH`
- `gulp` installed and in `PATH`
- `yarn` installed and in `PATH`

**Running the server**

Download the source code from git, then run the server!
This may take a few minutes to download additional dependencies.

```bash
$ git clone https://github.com/jaredloomis/declare
$ cd declare
$ yarn run start
```

Your server is now running on port 3000!

**Remote Installation**

If you are running Declare on a cloud server, you need to set up
an nginx reverse proxy to proxy requests coming from public port
`80`, to your server running on port `3000`.

```bash
$ sudo bash scripts/register_nginx_proxy.sh
```

Now your server can receive outside requests.

### Server controls

The server can be restarted or stopped

```bash
$ yarn run restart
$ yarn run stop
```

# Technology Stack

- [Node.js](https://nodejs.org/) handles all backend compute
- [GraphQL](https://graphql.org/) is the client-server communication protocol

- [React.js](https://reactjs.org/) for all frontend rendering
- [Redux](https://redux.js.org/) to manage frontend state
- [SASS](https://sass-lang.com/) and [Bulma](https://bulma.io/) keep things pretty

- [Selenium](https://www.seleniumhq.org/) runs tests in a chrome browser
- [nginx](https://www.nginx.org/) proxies requests from the outside world
- [webpack](https://gulpjs.com/) is responsible for building the client
- [gulp](https://gulpjs.com/) builds the server

# Contribute

I will graciously accept any contributions, and may be able to provide minimal
compensation as an added plus (contact me). Please see the
[public Trello board](https://trello.com/b/8rqPTLFl/declare).
