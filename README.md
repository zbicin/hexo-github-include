# hexo-github-include

This plugin allows you to include listings of files stored on GitHub. It fetches raw data from `https://raw.githubusercontent.com/path` and wraps it into markdown's triple backticks ` ``` `.

## Usage

`{% github_include path [language] %}`

For example:

`{% github_include zbicin/hexo-github-include/index.js js %}`

results in:

```
    ```js
    /* contents of index.js */
    ```
```