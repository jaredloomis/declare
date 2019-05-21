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

**Installing Dependencies**

- `nginx` running as a service (`systemctl start nginx`)
- `mongodb` running as a service (`systemctl start mongodb`)
- `RabbitMQ` running as a service (`systemctl start rabbitmq` or `systemctl start rabbitmq-server`)
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

### Server controls

The server can be restarted or stopped

```bash
$ yarn run restart
$ yarn run stop
```
