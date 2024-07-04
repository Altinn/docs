# Contributing to Altinn docs

The Altinn docs site is generated from [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
using the [Hugo](https://gohugo.io/overview/introduction/) static site generator. We use YAML as front matter.


## Initial setup

1. Install [Git](https://git-scm.com/downloads) and clone the [docs repository](https://github.com/altinn/docs) to a local folder:
```bash
git clone https://github.com/altinn/docs
```
2. Install [Visual Studio Code](https://code.visualstudio.com) for editing markdown
3. [Install Hugo](https://gohugo.io/installation/) for your operating system

## Build / Edit / Test

1. Open the docs repo-folder in visual studio code (or another editor)
2. Run `hugo server --navigateToChanged` open your browser at http://localhost:1313/docs/
3. Edit and save a file in the `content`-folder to get a new local build of the site refreshed in your browser.

## Deploy
Whenever changes are pushed to the docs-repository, an automatic deploy is updating https://altinn.github.io/docs/

If you don't have write access to the docs-repo, you need to
[create a fork](https://help.github.com/articles/fork-a-repo/) and submit a
[pull request](https://help.github.com/articles/about-pull-requests/).

## Links

 - [Markdown cheat-sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
 - [Hugo front matter](https://gohugo.io/content/front-matter/)
 
