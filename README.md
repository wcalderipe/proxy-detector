### Introduction

A NodeJS module wrapping a [Python lib](https://github.com/wcalderipe/system-proxy-detector) to detect O.S. HTTP and HTTPS proxy settings.

### Usage

```
var detector = require('proxy-detector');

detector.getProxies()
	.then(function(proxies) {
		console.log(proxies);
	});

```