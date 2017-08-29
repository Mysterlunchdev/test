define({ "api": [
  {
    "type": "Put",
    "url": "/api/specs",
    "title": "change specs",
    "version": "0.1.0",
    "name": "changeSpecs",
    "group": "Allergens",
    "description": "<p>changing specs after call, just give a body with the db object</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist: []\n\t}",
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
            "description": "<p>Database error</p>"
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
    "groupTitle": "Allergens"
  },
  {
    "type": "GET",
    "url": "/api/spec",
    "title": "getting allergens",
    "version": "0.1.0",
    "name": "getSpec",
    "group": "Allergens",
    "description": "<p>getting all allergens</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tspecs: req.user.specs, veggie:req.user.veggie, vegan:req.user.vegan\n\t}",
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
            "description": "<p>Database error</p>"
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
    "groupTitle": "Allergens"
  },
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
    "type": "GET",
    "url": "/api/days/:id",
    "title": "get likes",
    "version": "0.1.0",
    "name": "getLikes",
    "group": "Days",
    "description": "<p>getting likes for a meal</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "id",
            "description": "<p>id of meal</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlikes: Number,\n\t}",
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
            "description": "<p>Database error</p>"
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
    "type": "GET",
    "url": "/api/favdetail/:id",
    "title": "get favdetail",
    "version": "0.1.0",
    "name": "getFavoritesDetail",
    "group": "FavoritesDetail",
    "description": "<p>get details for favorites</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist: [Meal]\n\t}",
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
    "groupTitle": "FavoritesDetail"
  },
  {
    "type": "POST",
    "url": "/api/fav/:id/:mealid",
    "title": "favorize item",
    "version": "0.1.0",
    "name": "addMealToFavorite",
    "group": "Favorites",
    "description": "<p>adding meal to favorites of user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "id",
            "description": "<p>Deviceid</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist: data.meals\n\t}",
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
            "description": "<p>Database error</p>"
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
    "groupTitle": "Favorites"
  },
  {
    "type": "POST",
    "url": "/api/fav/:id",
    "title": "create device",
    "version": "0.1.0",
    "name": "createUserMeal",
    "group": "Favorites",
    "description": "<p>old method to create a deviceid when v2 is on. inserted new parameter into db to get that going.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist:data.meals,\n \t\t\tlikes:data.likes, \n \t\t\tmenu: data.menuplan\n\t}",
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
            "description": "<p>when query wrong or db error</p>"
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
    "groupTitle": "Favorites"
  },
  {
    "type": "DELETE",
    "url": "/api/fav/:id/:mealid",
    "title": "delete favorite",
    "version": "0.1.0",
    "name": "deleteMealToFavorite",
    "group": "Favorites",
    "description": "<p>deleting meal of users favorites</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "id",
            "description": "<p>Deviceid</p>"
          },
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "mealid",
            "description": "<p>Mealid</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\t_id: String,\n\t}",
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
            "description": "<p>Database error</p>"
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
    "groupTitle": "Favorites"
  },
  {
    "type": "GET",
    "url": "/api/fav",
    "title": "get Favorites",
    "version": "0.1.0",
    "name": "getFavorites",
    "group": "Favorites",
    "description": "<p>getting all favorites</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist: data.meals,likes: data.likes, menu: data.menuplan\n\t}",
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
    "groupTitle": "Favorites"
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
    "type": "POST",
    "url": "/api/like/:id/:mealid",
    "title": "like a meal",
    "version": "0.1.0",
    "name": "likeMeal",
    "group": "Like",
    "description": "<p>like a meal and count, then save</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "id",
            "description": "<p>Device ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist:data.meals,\n \t\t\tlikes:data.likes, \n \t\t\tmenu: data.menuplan\n\t}",
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
            "description": "<p>Database error</p>"
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
    "groupTitle": "Like"
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
  },
  {
    "type": "GET",
    "url": "/api/meal/:id",
    "title": "getting specific meal",
    "version": "0.1.0",
    "name": "getSpecMeal",
    "group": "Meals",
    "description": "<p>getting a specific meal</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "id",
            "description": "<p>Deviceid</p>"
          },
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "mealid",
            "description": "<p>Mealid</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tmeal\n\t}",
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
            "description": "<p>Database error</p>"
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
    "type": "GET",
    "url": "/api/all/:id",
    "title": "getting menu",
    "version": "0.1.0",
    "name": "getAll",
    "group": "Menu",
    "description": "<p>same as getMenu getting menu, likes and meals</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist:data.meals,\n \t\t\tlikes:data.likes, \n \t\t\tmenu: data.menuplan\n\t}",
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
            "description": "<p>when query wrong or db error</p>"
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
    "groupTitle": "Menu"
  },
  {
    "type": "GET",
    "url": "/api/menu/:id",
    "title": "getting menu",
    "version": "0.1.0",
    "name": "getMenu",
    "group": "Menu",
    "description": "<p>getting menu, likes and meals</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist:data.meals,\n \t\t\tlikes:data.likes, \n \t\t\tmenu: data.menuplan\n\t}",
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
            "description": "<p>when query wrong or db error</p>"
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
    "groupTitle": "Menu"
  },
  {
    "type": "POST",
    "url": "/api/menu/:id/:mealid",
    "title": "add to menu",
    "version": "0.1.0",
    "name": "addMealToMenu",
    "group": "Menus",
    "description": "<p>adding meal to menu</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "id",
            "description": "<p>Deviceid</p>"
          },
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "mealid",
            "description": "<p>Mealid</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist: data.menuplan\n\t}",
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
            "description": "<p>Database error</p>"
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
    "groupTitle": "Menus"
  },
  {
    "type": "DELETE",
    "url": "/api/menu/:id/:mealid",
    "title": "deleting meal in menu",
    "version": "0.1.0",
    "name": "deleteMenuToMeal",
    "group": "Menus",
    "description": "<p>deleting meal from menu</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "id",
            "description": "<p>Deviceid</p>"
          },
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "mealid",
            "description": "<p>Mealid</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\t_id: String,\n\t}",
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
            "description": "<p>Database error</p>"
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
    "groupTitle": "Menus"
  },
  {
    "type": "POST",
    "url": "/api/news",
    "title": "create news",
    "version": "0.1.0",
    "name": "createNews",
    "group": "News",
    "description": "<p>creating new news</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "picture",
            "description": "<p>url of picture</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>description or text</p>"
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
    "groupTitle": "News"
  },
  {
    "type": "GET",
    "url": "/api/news",
    "title": "getting news",
    "version": "0.1.0",
    "name": "getNews",
    "group": "News",
    "description": "<p>getting all news for client</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist:[{title, picture, text, date}],\n\t}",
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
    "groupTitle": "News"
  },
  {
    "type": "GET",
    "url": "/api/news/:id",
    "title": "get specific news",
    "version": "0.1.0",
    "name": "getNewsDetail",
    "group": "News",
    "description": "<p>getting one specific news</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "id",
            "description": "<p>id of news</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tnews: News\n\t}",
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
    "groupTitle": "News"
  },
  {
    "type": "GET",
    "url": "/api/twitter",
    "title": "get Socialfeed",
    "version": "0.1.0",
    "name": "getTwitter",
    "group": "Social",
    "description": "<p>getting instagram und social feed</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK \n\t{\n\t\tlist:[{}],\n\t\tinsta: [{}]\n\t}",
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
    "groupTitle": "Social"
  }
] });
