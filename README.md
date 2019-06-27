# Space 48 UI Components

This repository contains regularly used ui components for ecommerce builds. Develop them in isolation with [Storybook](https://storybook.js.org/), test them with [jest](https://jestjs.io/), then browse and install them into projects with [bit.dev](http://bit.dev/)

## System requirements

You'll want to ensure you have the following already installed on your local machine before getting started:

* **Node:** LTS 10.14. If you don't currently run local node versions, we recommend [NVM](https://github.com/creationix/nvm).

* **Yarn:** Dependencies are currently managed by Yarn rather than NPM due to some peculiarities of webpack peer dependencies. See [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) for installation instructions.

## Getting started

Run the following command in your terminal within the root directory:

```
$ yarn install
```

## Local development

Storybook environments are used for development. Run the storybook script with the configuration flag to boot up a local environment. See the following scripts table for details:

| Script  | Purpose | Options |
|---------|---|---|
| storybook | Runs and opens [Storybook](https://storybook.js.org/) on a local server. | -c .storybook/react or -c .storybook/html |
| build-storybook  | [Exports](https://storybook.js.org/docs/basics/exporting-storybook/) Storybook as a static app | -c .storybook/react or -c .storybook/html |
| test  | Runs [jest](https://jestjs.io/). Use additional [options](https://jestjs.io/docs/en/cli) immediately after yarn run test | --watch for watch mode or supply any other from the cli options |
| build | Runs webpack using the build config | Any webpack cli options |

## Contributing components
Firstly, please develop your component on a feature branch and create a new issue for it. This provides exposure to the team and improves quality assurance and collaboration.

Create your component inside the directory applicable to it's type i.e. a react component inside ```src/react/<component_name>```

Components should contain at the minimum a story, an index file & the component itself. You can optionally add:
- Jest tests inside a ```__tests__``` directory
- An accompanying .pcss, .scss or .css file
- Any utility or component specific files

### Legacy system support
If you wish to make your component available to legacy systems, you can use the build or build-bundle scripts provided in this repository. e.g. To build a umd version of the dropdown component so it's available on window you would run:

```
yarn run build --output-library-target umd --entry ./src/html/dropdown/ --o ./src/html/dropdown/dist/dropdown-umd.js
```

## Publishing

[bit.dev](https://bit.dev) is used for publishing, viewing and distributing components. Before you can publish, you need to setup bit.

### Install the bit cli
In your terminal run:

```
$ yarn global bit-bin
```

In the repository root run:

```
$ bit init
```

If this is your first time using bit via cli, run:

```
$ bit login
```

### Add your component
Once setup is complete, you can add your component to the registry!

In your terminal run:
```
$ bit add src/<path to your component>/<files to publish>
```
e.g. bit add src/react/message/* will publish all files for the react message component.

Now added, you just need to run the export to push to the remote registry:
```
$ bit export dsbelding.ui-components
```
Your component should now be available in your collection on bit.dev


## Import into your project

The following are common usage examples for projects:

#### Import dist files
If you want to install a component that is compatible with a legacy system e.g. AMD or es2015, you can install the components dist files rather than the component itself.

```
$ bit import --dist --ignore-package-json -p ./<target directory> dsbelding.ui-components/message
```

#### Import with generated dependencies
If you want to install a component with it's own package.json and node_modules:

```
$ bit import -p ./<target directory> dsbelding.ui-components/message
```

#### Import without generated dependencies
If you want to install a component's source files but without automatically generated dependencies:
```
$ bit import --ignore-package-json -p ./<target directory> dsbelding.ui-components/message
```

The components files should now have been written to the target directory you specified.

