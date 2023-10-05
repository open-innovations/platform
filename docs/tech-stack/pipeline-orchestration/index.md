---
title: Pipeline Orchestration
---

## Windows Subsystem for Linux (WSL)

It's a good idea to use a linux environment for various reasons. Primarily, we do this so that we develop our codebase on a common system; one person can easily pick-up where another left off. You can follow [this tutorial on How to Install WSL on Windows](https://learn.microsoft.com/en-us/windows/wsl/install). You'll have to do your own research for macOS.

You can enter the Linux environment using the `bash` command or similar in a terminal.

### Versions of WSL

Sometimes you need to switch your version of WSL. For example, in the JRF project we use [duckDB](https://duckdb.org/) to manage our database. WSL 2 is slower than WSL 1 at reading files across operating systems, so I had to switch to WSL 1. [Here you can see how to change WSL version](https://learn.microsoft.com/en-us/windows/wsl/install#set-up-your-linux-user-info).

-------------------------

## Pipenv

"Pipenv automatically creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates a project Pipfile.lock, which is used to produce deterministic builds." [I lifted this from the Pipenv website](https://pipenv.pypa.io/en/latest/). Essentially, its about making sure you have the right packages and the right dependencies for Python and DVC (see below).

You can read [how to install pipenv](https://pipenv.pypa.io/en/latest/installation/) and [its commands](https://pipenv.pypa.io/en/latest/commands/). You should install this from within WSL. It's probably useful to install globally too, but it's up to you.

### Using or creating a pipenv

You can follow the [workflow guide for pipenv](https://docs.pipenv.org/basics/#example-pipenv-workflow), but I've summarised it based on my experience using it below.

*If a project's virtual environment has already been created*: use `pipenv shell` to activate it.

*If you're setting up a new project*: in my experience the easiest thing to do is as follows (assuming you have a working version of python in WSL).
In the project folder, at the top level, create an empty file called `Pipfile`.
Enter the command `pipenv shell`. This will create the virtual environent, which can be accessed in future using `pipenv shell` again.

You'll want to generate the lock file. You can do this using `pipenv lock`.

### Installing packages with `pipenv`

Use the command `pipenv install <package_name>`. This will install that package only for that environment.

### When someone else adds a package to `pipenv`

If someone else installs a package, run `pipenv update`, which will install all packages from the lock file.

-------------------------

## DVC

We use [DVC](https://dvc.org/) to manage our pipelines and their dependencies. There are many useful commands and modifiers, but I've summarised the most important ones below.

### Tracking and updating remote files from URLs

`dvc import-url <link_to_download> <file_name>`. This allows you to track, say, an ONS dataset available at a download link on their site. Note: these files are tracked by DVC in a `.dvc` file, so by default they are added to a `.gitignore` file.

Once you;ve set up a file to track and download, you will probably want to check for update periodically. Assuming the URL is the same, you can run `dvc update -R <folder>`. This should update everything in folder if DVC detects that the file has changed (the R means recursive).

Anything that hasn’t changed gets skipped. If the file has changed, dvc should re-download the new version. If the url has changed, you’ll have to re-import the file.

### The dvc.yaml file

Description of what to put in a basic dvc.yaml file

### Running a pipeline

`dvc repro <path/to/pipeline/dvc.yaml>` will reproduce the pipeline. DVC will skip the stage if the dependencies haven’t changed. You can force a pipelines to re-run using the `-F` modifer.

If the output of your pipelines power a visualisation, it's a good habit to check site still loads before committing the changes to GitHub.

## Workflow example
