angular.module("sportsStoreAdmin")
    .constant("productUrl", "http://localhost:5500/products/")
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("productCtrl", function ($scope, $resource, productUrl) {
        $scope.productsResource = $resource(productUrl + ":id", { id: "@id" });
        $scope.listProducts = function () {
            $scope.products = $scope.productsResource.query();
        }
        $scope.deleteProduct = function (product) {
            product.$delete().then(function () {
                $scope.products.splice($scope.products.indexOf(product), 1);
            });
        }
        $scope.createProduct = function (product) {
            new $scope.productsResource(product).$save().then(function (newProduct) {
                $scope.products.push(newProduct);
                $scope.newProduct = null;
            });
        }
        $scope.updateProduct = function (product) {
            product.$save();
            $scope.editedProduct = null;
        }
        $scope.startEdit = function (product) {
            $scope.newProduct = null;
            $scope.editedProduct = product;
        }
        $scope.cancelEdit = function () {
            $scope.editedProduct = null;
            $scope.newProduct = null;
        }
        $scope.inEdit = function (item) {
            return $scope.editedProduct && $scope.editedProduct.id == item.id;
        }
        $scope.listProducts();
    });