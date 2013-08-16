## Mediator

A simple mediator with only the most basic functionality.

Basic usage:

    var Mediator = require("mediator");
    
    // Create a mediator
    var m = new Mediator();
    
    // Add a listener
    m.listen("notification", function(data) { console.log(data); });
    
    // Trigger a listener
    m.trigger("notification", "Hello");
  
For more usage examples, please see the test cases.

## Features

- No external dependencies
- AMD compatible
- Supports wildcards in both listeners and triggers
