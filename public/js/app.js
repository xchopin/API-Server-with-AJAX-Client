"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.Shop = function () {

    var module = {};

    module.Basket = function () {
        function Basket() {
            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var price = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            _classCallCheck(this, Basket);

            this.id = id;
            this.price = price;
            this.items = [];
            this.db = [];
        }

        _createClass(Basket, [{
            key: "order",
            value: function order() {
                module.buy();
            }
        }, {
            key: "add_product",
            value: function add_product(product) {
                if ($.inArray(product.id, this.db) == -1) {
                    var quantity = 1;
                    if (product.hasOwnProperty("pivot")) {
                        quantity = product.pivot.quantity;
                    }

                    Object.defineProperty(product, "quantity", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: quantity
                    });

                    this.items.push(product);
                    this.db.push(product.id);
                    this.display(product);
                } else {
                    // grep function doesn't work so let's do some old school shits !
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var item = _step.value;

                            if (item.id == product.id) {
                                $('#' + item.id).text('(' + item.quantity++ + ')');
                                this.display_update(item);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
        }, {
            key: "display_total",
            value: function display_total() {
                var price = 0;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var item = _step2.value;

                        price += item.price * item.quantity;
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                $('#total').text('Total : ' + price + ' $');
            }
        }, {
            key: "display_number_items",
            value: function display_number_items() {
                var number = this.items.length;
                if (number == 0) {
                    $('#numberItems').text('Your basket is empty');
                } else {
                    var counter = 0;
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = this.items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var i = _step3.value;

                            counter += i.quantity;
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    $('#numberItems').text('Basket : (' + counter + ' items)');
                }
            }
        }, {
            key: "display_resume",
            value: function display_resume(item) {
                var id = $('#basketMenu');
                var li = $('<li>').addClass('product');
                var a = $('<a>').text(item.name);
                var span = $('<span>').prop('id', item.id).text('(' + item.quantity + ')');

                a.append(span);
                li.append(a);
                id.append(li);
                return id;
            }
        }, {
            key: "display_update",
            value: function display_update(item) {
                this.display_number_items();
                $('#' + item.id).text('(' + item.quantity + ')');
                this.display_total();
            }
        }, {
            key: "display",
            value: function display(item) {
                this.display_number_items();
                this.display_resume(item);
                this.display_total();
            }
        }, {
            key: "empty",
            value: function empty() {
                $('.product').remove();
                this.items = [];
                this.db = [];
                this.display_number_items();
                this.display_total();
            }
        }]);

        return Basket;
    }();

    var id_basket = 1; // In our case we only have one customer so one basket :p

    var basket = new module.Basket(id_basket);

    module.Product = function () {
        function Product() {
            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'untitled';
            var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'undefined';
            var file = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '404';
            var price = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
            var quantity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

            _classCallCheck(this, Product);

            this.id = id;
            this.name = name;
            this.description = description;
            this.file = file;
            this.price = price;
            this.quantity = quantity;
        }

        _createClass(Product, [{
            key: "display",
            value: function display() {
                var slot = $('<div>').addClass('col-lg-4');
                slot.append(this.display_image());
                slot.append(this.display_name());
                slot.append(this.display_quantity());
                slot.append(this.display_price());
                slot.append(this.display_description());
                slot.append(this.display_button());
                return slot;
            }
        }, {
            key: "display_image",
            value: function display_image() {
                return "<img class='img-responsive' src='img/" + this.id + ".jpg' alt='product'/> <br>";
            }
        }, {
            key: "display_name",
            value: function display_name() {
                var capsule = $('<p>').addClass('text-center');
                var content = $('<strong>').text(this.name);
                capsule.append(content);
                return capsule;
            }
        }, {
            key: "display_quantity",
            value: function display_quantity() {
                return $('<span>').text('Quantity : ' + this.quantity);
            }
        }, {
            key: "display_price",
            value: function display_price() {
                return $('<span>').addClass('pull-right').text(' Price : ' + this.price + ' $');
            }
        }, {
            key: "display_description",
            value: function display_description() {
                var p = $('<p>');
                return p.append($('<em>').text(this.description));
            }
        }, {
            key: "display_button",
            value: function display_button() {
                var _this = this;

                var btn = $('<button>').addClass('btn btn-success btn-block').append($('<i>').addClass('fa fa-shopping-cart').text(' Buy'));

                btn.click(function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    module.addProduct(basket, _this);
                });

                return btn;
            }
        }]);

        return Product;
    }();

    module.products = [];

    module.display_products = function (div_id) {
        $.when.apply(null, module.products).then(function () {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = module.products[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var product = _step4.value;

                    $(div_id).append(product.display());
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        });
    };

    module.productFactory = function (product) {
        return new module.Product(product.id, product.name, product.description, product.file, product.price, product.quantity);
    };

    module.basketInit = function () {
        module.clearBasket(basket);
        module.buy(basket);
        module.loadBasket(basket);
    };

    module.play_animation1 = function () {
        $('#animation-image').hide().append('<i id="logo-animation" class="fa fa-refresh fa-spin fa-3x fa-fw vert"></i>').fadeIn("slow");

        $('#animation-text').hide().append('<p id="text-animation" class="vert">Validating your purchase...</p>').fadeIn("slow");
    };

    module.stop_animation1 = function () {
        $('#animation-image').fadeOut('slow', function () {
            $('#logo-animation').remove();
        });

        $('#animation-text').fadeOut('slow', function () {
            $('#text-animation').remove();
        });
    };

    module.play_animation2 = function () {

        $('#animation-image').show().append('<canvas height="180"></canvas> <br>');

        $('#animation-text').hide().append('<p class="vert"><br><br>Your order has been shipped :)</p>').fadeIn("slow");

        var start = 100;
        var mid = 145;
        var end = 250;
        var width = 20;
        var leftX = start;
        var leftY = start;
        var rightX = mid - width / 2.7;
        var rightY = mid + width / 2.7;
        var animationSpeed = 20;

        var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
        ctx.lineWidth = width;
        ctx.strokeStyle = 'rgba(0, 150, 0, 1)';

        for (var i = start; i < mid; i++) {
            var drawLeft = window.setTimeout(function () {
                ctx.beginPath();
                ctx.moveTo(start, start);
                ctx.lineTo(leftX, leftY);
                ctx.stroke();
                leftX++;
                leftY++;
            }, 1 + i * animationSpeed / 3);
        }

        for (var _i = mid; _i < end; _i++) {
            var drawRight = window.setTimeout(function () {
                ctx.beginPath();
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(rightX, rightY);
                ctx.stroke();
                rightX++;
                rightY--;
            }, 1 + _i * animationSpeed / 3);
        }
    };

    //   Ajax Section

    module.loadCatalog = $.getJSON('./api/products').done(function (data) {
        $.each(data, function (index, product) {
            module.products.push(module.productFactory(product));
        });
    }).fail(function () {
        console.log('AJAX Error ! Cannot reach the server');
    });

    module.addProduct = function (basket, product) {
        $.post("./addProduct/", { basket_id: basket.id, product_id: product.id }).done(function () {
            alert(product.name + ' added to your basket !');
            basket.add_product(product);
        }).fail(function () {
            console.log('AJAX Error ! Cannot reach the server ');
        });
    };

    module.loadBasket = function (basket) {
        $.getJSON('./api/basket/' + basket.id, function () {}).done(function (data) {
            $.each(data, function (index, product) {
                basket.add_product(product);
            });
            basket.display_number_items();
        }).fail(function () {
            console.log('AJAX Error ! Cannot reach the server ');
        });
    };

    module.clearBasket = function (basket) {
        $("#clearBasket").click(function () {
            $.ajax({
                url: "./clearBasket/" + basket.id,
                type: 'DELETE',
                success: function success() {
                    basket.empty();
                    alert('Your basket is now empty !');
                }
            });
        });
    };

    module.buy = function (basket) {
        $('#order').click(function () {
            var done = 0;
            module.play_animation1();
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                var _loop = function _loop() {
                    var item = _step5.value;

                    $.get("./order").done(function (data) {
                        if (data == 'validated') {
                            alert('Your ' + item.name + ' has been validated');
                            var p = $('#' + item.id).parent().addClass('vert');
                            p.append(" Validated");
                            done++;
                        }

                        if (done == basket.items.length) {
                            module.stop_animation1();
                            setTimeout(function () {
                                module.play_animation2();
                            }, 1500);
                        }
                    }).fail(function () {
                        console.log('AJAX Error ! Cannot reach the server ');
                    });
                };

                for (var _iterator5 = basket.items[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        });
    };

    return module;
}();

$(function () {
    Shop.display_products('#catalogue');
    Shop.basketInit();
});
