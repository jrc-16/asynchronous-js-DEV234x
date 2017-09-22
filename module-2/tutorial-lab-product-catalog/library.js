// library.js

(function( window ) {

  // console.log("test");

  function myLibrary() {

      debugger

      // execute code here
      var searchProductById = "one";
      var searchProductsByPrice = "two";
      var searchProductsByType = "three";
      var searchAllProducts = "four";

      return {
          searchProductById: searchProductById,
          searchProductsByPrice: searchProductsByPrice,
          searchProductsByType: searchProductsByType,
          searchAllProducts: searchAllProducts
      };

      // function definitions go here

  }

  // If window object has no 'api' property, invoke our library Constructor
  if( typeof(window.api) === 'undefined' ) {
    window.api = myLibrary();
  }

}(window) );
