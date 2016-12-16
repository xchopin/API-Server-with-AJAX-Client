window.Shop = (() => {

    let module = {};

    module.Basket = class Basket {

        constructor(id = 0, price = 0) {
            this.id = id;
            this.price = price;
            this.items = [];
            this.db = [];
        }

        order() {
            module.buy();
        }

        add_product(product) {
            if ( $.inArray(product.id, this.db) == -1) {
                let quantity = 1;
                if(product.hasOwnProperty("pivot")){
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
                for (let item of this.items) {
                    if (item.id == product.id) {
                        $('#'+item.id).text('(' + item.quantity++ + ')');
                        this.display_update(item);
                    }
                }
            }
        }

        display_total() {
            let price = 0;
            for (let item of this.items){
                price+=item.price * item.quantity;
            }
            $('#total').text('Total : ' + price + ' $');
        }

        display_number_items() {
            let number = this.items.length;
            if (number == 0) {
                $('#numberItems').text('Your basket is empty');
            } else {
                let counter = 0;
                for (let i of this.items){
                    counter+= i.quantity;
                }
                $('#numberItems').text('Basket : (' + counter + ' items)');
            }
        }

        display_resume(item) {
            let id = $('#basketMenu');
            let li = $('<li>').addClass('product');
            let a = $('<a>').text(item.name);
            let span = $('<span>').prop('id',item.id).text('('+item.quantity+')');

            a.append(span);
            li.append(a);
            id.append(li);
            return id;
        }

        display_update(item) {
            this.display_number_items();
            $('#' + item.id).text('('+item.quantity+')');
            this.display_total();
        }

        display(item) {
            this.display_number_items();
            this.display_resume(item);
            this.display_total();
        }

        empty(){
            $('.product').remove();
            this.items = [];
            this.db = [];
            this.display_number_items();
            this.display_total();

        }
    };

    let id_basket = 1;  // In our case we only have one customer so one basket :p

    let basket = new module.Basket(id_basket);

    module.Product = class Product {

            constructor(id = 0, name = 'untitled', description = 'undefined', file='404', price = 0, quantity = 0) {
                this.id = id;
                this.name = name;
                this.description = description;
                this.file = file;
                this.price = price;
                this.quantity = quantity;
            }

            display() {
                let slot = $('<div>').addClass('col-lg-4');
                slot.append(this.display_image());
                slot.append(this.display_name());
                slot.append(this.display_quantity());
                slot.append(this.display_price());
                slot.append(this.display_description());
                slot.append(this.display_button());
                return slot;
            }

            display_image() {
                return "<img class='img-responsive' src='img/" + this.id + ".jpg' alt='product'/> <br>";
            }

            display_name() {
                let capsule = $('<p>').addClass('text-center');
                let content = $('<strong>').text(this.name);
                capsule.append(content);
                return capsule;
            }

            display_quantity() {
                return $('<span>').text('Quantity : ' + this.quantity);
            }

            display_price() {
                return $('<span>').addClass('pull-right').text(' Price : ' + this.price + ' $');
            }

            display_description() {
                let p = $('<p>');
                return p.append($('<em>').text(this.description));
            }

            display_button() {
               let btn = $('<button>').addClass('btn btn-success btn-block')
                      .append($('<i>').addClass('fa fa-shopping-cart').text(' Buy'));

               btn.click((event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    module.addProduct(basket, this);
                });

               return btn;
            }

    };

    module.products = [];

    module.display_products = (div_id) => {
        $.when.apply(null, module.products).then(() => {
            for (let product of module.products){
                $(div_id).append(product.display());
            }
        });
    };

    module.productFactory = (product) => {
        return new module.Product(
                     product.id,
                     product.name,
                     product.description,
                     product.file,
                     product.price,
                     product.quantity
        );
    };

    module.basketInit = ( () => {
        module.clearBasket(basket);
        module.buy(basket);
        module.loadBasket(basket);
    });

    module.play_animation1 = ( () => {
        $('#animation-image')
            .hide()
            .append('<i id="logo-animation" class="fa fa-refresh fa-spin fa-3x fa-fw vert"></i>')
            .fadeIn("slow");

        $('#animation-text')
            .hide()
            .append('<p id="text-animation" class="vert">Validating your purchase...</p>')
            .fadeIn("slow");
    });

    module.stop_animation1 = ( () => {
        $('#animation-image').fadeOut('slow', () => {
            $('#logo-animation').remove();
        });

        $('#animation-text').fadeOut('slow', () => {
            $('#text-animation').remove();
        });
    });

    module.play_animation2 = ( () => {

        $('#animation-image')
            .show()
            .append('<canvas height="180"></canvas> <br>');

        $('#animation-text')
            .hide()
            .append('<p class="vert"><br><br>Your order has been shipped :)</p>')
            .fadeIn("slow");

        let start = 100;
        let mid = 145;
        let end = 250;
        let width = 20;
        let leftX = start;
        let leftY = start;
        let rightX = mid - (width / 2.7);
        let rightY = mid + (width / 2.7);
        let animationSpeed = 20;

        let ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
        ctx.lineWidth = width;
        ctx.strokeStyle = 'rgba(0, 150, 0, 1)';

        for (let i = start; i < mid; i++) {
            let drawLeft = window.setTimeout(function() {
                ctx.beginPath();
                ctx.moveTo(start, start);
                ctx.lineTo(leftX, leftY);
                ctx.stroke();
                leftX++;
                leftY++;
            }, 1 + (i * animationSpeed) / 3);
        }

        for (let i = mid; i < end; i++) {
            let drawRight = window.setTimeout(function() {
                ctx.beginPath();
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(rightX, rightY);
                ctx.stroke();
                rightX++;
                rightY--;
            }, 1 + (i * animationSpeed) / 3);
        }
    });

    //   Ajax Section

    module.loadCatalog =  $.getJSON('./api/products').done((data) => {
        $.each(data, (index, product) => {
            module.products.push(module.productFactory(product));
        });
    }).fail(() => {
        console.log( 'AJAX Error ! Cannot reach the server' );
    });

    module.addProduct = (basket, product) => {
        $.post( "./addProduct/", {basket_id : basket.id, product_id : product.id }).done(() => {
            alert(product.name + ' added to your basket !');
            basket.add_product(product);
        }).fail(() => {
            console.log( 'AJAX Error ! Cannot reach the server ' );
        })
    };

    module.loadBasket = ((basket) => {
        $.getJSON('./api/basket/'+basket.id, () => {
        }).done((data) => {
            $.each(data, (index, product) => { basket.add_product(product); });
            basket.display_number_items();
        }).fail(() => {
            console.log( 'AJAX Error ! Cannot reach the server ' );
        });
    });

    module.clearBasket = ((basket) => {
        $("#clearBasket").click(() => {
            $.ajax({
                url: "./clearBasket/"+basket.id,
                type: 'DELETE',
                success: () => {
                    basket.empty();
                    alert('Your basket is now empty !');
                }
            });
        });
    });

    module.buy = ((basket) => {
        $('#order').click(() => {
            let done = 0;
            module.play_animation1();
            for (let item of basket.items) {
                $.get( "./order" ).done((data) => {
                    if (data == 'validated') {
                         alert('Your ' + item.name + ' has been validated');
                         let p = $('#'+item.id).parent().addClass('vert');
                         p.append(" Validated");
                         done++;
                    }

                    if (done == basket.items.length){
                        module.stop_animation1();
                        setTimeout(() => {
                            module.play_animation2();
                        }, 1500);
                    }

                }).fail(() => {
                    console.log( 'AJAX Error ! Cannot reach the server ' );
                })
            }
        });
    });


return module;

})();

$( () => {
    Shop.display_products('#catalogue');
    Shop.basketInit();
});