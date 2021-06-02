var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var feed, lastFed


function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
  //create feed the dog button here

  feed = createButton("Feed Food");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  //write code to read fedtime value from the database
  lastFed = database.ref('feedTime');
  lastFed.on("value", function (data) {
    lastFed = data.val();
  })

  //write code to display text lastFed time here
  fill("white");
  text("last fed: " + lastFed, 80, 30);

  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

// function to feed dog
function feedDog() {
  var food_stock_val = foodObj.getFoodStock();
  if (food_stock_val <= 0) {
    foodObj.updateFoodStock(food_stock_val * 0);
  }
  else {
    foodObj.updateFoodStock(food_stock_val - 1);
  }
  dog.addImage(happyDog);
}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS,
    feedTime: hour()
  })
}