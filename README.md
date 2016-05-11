##Setup

Install node and install the npm dependencies.

```
npm i
```

##Usage

The program is started by typing `npm start`.

By default, the program will load a file containing the test data you sent me, and `log` the neighbors and then the shortest paths for each datapoint.

* If you provide it a filename (ie - `npm start usethisfile.txt`, it can parse any equivalently (ie - comma and newline) delimited text file.
* If you provide it two datapoints (ie - `npm start 1 2`), it will determine whether or not they are neighbours, and the shortest path between them.
* You can also provide it a custom file and then two data points (ie - `npm start testfile 3 6`).

##Tests

Since this wasn't a timed exercise, I took my time and worked in a TDD style, so you can follow my development process via the test output.

The test suite can be run by type `npm test`