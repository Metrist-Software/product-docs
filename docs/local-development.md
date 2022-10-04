# Viewing docs locally

Hosting the docs locally requires docker, and at least 10GB free space and 2GB system memory.
The full instructions are here https://dev.readthedocs.io/en/latest/install.html, but summary steps below.

1. `pip install mkdocs`
2. Confirm installation with `mkdocs --version`. If an error comes up, you may need to preface this and the next command with `python -m`
3. `mkdocs serve`

The docs should be available at http://127.0.0.1:8000/