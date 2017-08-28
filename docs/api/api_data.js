define({ "api": [
  {
    "type": "POST",
    "url": "/api/beacon",
    "title": "create Beacon",
    "version": "0.1.0",
    "name": "createBeacon",
    "group": "Beacons",
    "description": "<p>Creating new Beacon</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>when couldnt save</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Beacons"
  },
  {
    "type": "GET",
    "url": "/api/beacon",
    "title": "get beacons",
    "version": "0.1.0",
    "name": "getBeacon",
    "group": "Beacons",
    "description": "<p>get all beacons</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist: [BeaconsObject]\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>when database problems</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Beacons"
  },
  {
    "type": "POST",
    "url": "/api/canteen",
    "title": "creating new canteen",
    "version": "0.1.0",
    "name": "createCanteen",
    "group": "Canteens",
    "description": "<p>creating new canteen</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>name of the canteen</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>when saving problem</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Canteens"
  },
  {
    "type": "GET",
    "url": "/api/canteen",
    "title": "get all canteens",
    "version": "0.1.0",
    "name": "getCanteens",
    "group": "Canteens",
    "description": "<p>get all canteens</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist: [{name: String}],\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>When form is wrong</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Canteens"
  },
  {
    "type": "post",
    "url": "/api/days/:id",
    "title": "create new day with meal",
    "version": "0.1.0",
    "name": "createDay",
    "group": "Days",
    "description": "<p>create a new date in db and allocate meal to it</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>id of meal</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "day",
            "description": "<ul> <li>date of allocation</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tday: Date,\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>When form is wrong</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Days"
  },
  {
    "type": "get",
    "url": "/api/days",
    "title": "get days",
    "version": "0.1.0",
    "name": "getDays",
    "group": "Days",
    "description": "<p>get all days</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist: [{days}]\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>When form is wrong</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Days"
  },
  {
    "type": "POST",
    "url": "/api/feedback",
    "title": "send feedback",
    "version": "0.1.0",
    "name": "sendFeedback",
    "group": "Feedback",
    "description": "<p>send users feedback to server</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text of the feedback</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>When form is wrong</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Feedback"
  },
  {
    "type": "post",
    "url": "/api/ingredients",
    "title": "create ingredient",
    "version": "0.1.0",
    "name": "createIngredient",
    "group": "Ingredients",
    "description": "<p>create new ingredient</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "de",
            "description": "<ul> <li>german name</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "en",
            "description": "<ul> <li>english Name</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>When form is wrong</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Ingredients"
  },
  {
    "type": "get",
    "url": "/api/ingredients",
    "title": "get ingredients",
    "version": "0.1.0",
    "name": "getIngredients",
    "group": "Ingredients",
    "description": "<p>get all ingredients</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist: [{\n\t\t\tname: {\n +\t\t\t\t\tde: String,\n +\t\t\t\t\ten: String\t\n +\t\t\t\t}\t\n\t\t}]\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>When form is wrong</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Ingredients"
  },
  {
    "type": "put",
    "url": "/api/meal/:id",
    "title": "change meal",
    "version": "0.1.0",
    "name": "changeMeal",
    "group": "Meals",
    "description": "<p>change a specific meal</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>id of meal</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "type",
            "optional": false,
            "field": "name",
            "description": "<ul> <li>desc</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\tobject like meal",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>When form is wrong</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Meals"
  },
  {
    "type": "post",
    "url": "/api/meal",
    "title": "create meal",
    "version": "0.1.0",
    "name": "createMeal",
    "group": "Meals",
    "description": "<p>Create new meal</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>[&quot;de&quot;] - Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ingredients[Object]",
            "description": "<ul> <li>All ingredients</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "description",
            "description": "<ul> <li>Object with de and en</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "specs[]",
            "description": "<ul> <li>Objects with de, en and val (0 for is not inside and 1 is inside)</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<ul> <li>URL to picture</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "price",
            "description": "<ul> <li>Array includes objects with name and price</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tmeal like db\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>When form is wrong</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Meals"
  },
  {
    "type": "delete",
    "url": "/api/meal/:id",
    "title": "delete meal",
    "version": "0.1.0",
    "name": "deleteMeal",
    "group": "Meals",
    "description": "<p>delete Meal</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>id of meal</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>When form is wrong</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Meals"
  },
  {
    "type": "get",
    "url": "/api/meal",
    "title": "get meals",
    "version": "0.1.0",
    "name": "getMeals",
    "group": "Meals",
    "description": "<p>Get all meals</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n  {list: [{\n     name: {\n      de: String,\n      en: String\n    },\n    ingredients: [{\n      de: String,\n      en: String\n    }],\n    description: {\n      de: String,\n      en: String\n    },\n    specs: [{\n      de: String,\n      en: String,\n      val: Number\n    }],\n    picture: String,\n    price: [{\n      name: String,\n      price: String,\n    }],\n    fav: Number\n  }]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>When error in db</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "application/server/controller/users.js",
    "groupTitle": "Meals"
  }
] });
