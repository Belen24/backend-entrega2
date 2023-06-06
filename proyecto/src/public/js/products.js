/*console.log("javascript products")

const addToCart = async(productId)=>{
    console.log("Este sera el producto a agregar", productId);
    fetch("http://localhost:8080/",{

    })
};

const addToCart = async (productId) => {
    try {
        const response = await fetch(`http://localhost:8080/cart/${cartId}/product/${productId}`, {
            method: 'POST',
        });
        
        if (response.ok) {
            // El producto se agregó correctamente al carrito
            console.log('Producto agregado al carrito');
        } else {
            // Ocurrió un error al agregar el producto al carrito
            console.log('Error al agregar el producto al carrito');
        }
    } catch (error) {
        console.log('Error de red:', error);
    }
};*/

let cartDiv = document.getElementById("cartDiv");
let productsDiv = document.getElementById("productsDiv");

let cartId = "";

const newCart = async () => {
    try {
        if (!cartId) {
            const resp = await fetch(`http://localhost:8080/api/carts/`, {
                method: "POST",
            });
            const result = await resp.json();
            console.log("resultado", result);
            cartId = result.data._id;
           

            cartDiv.innerHTML = cartId;
        } else {
            console.log("Se esta usando un carrito");
        }
    } catch (error) {
        console.log("Error: ", error.message);
    }
};

const addToCart = async (productId) => {
    try {
        if (productId && cartId) {
            const resp = await fetch(
                `http://localhost:8080/api/carts/${cartId}/product/${productId}`,
                {
                    method: "POST",
                }
            );
            const result = await resp.json();

            if (result.status == "success") {
                const payload = await fetch(
                    `http://localhost:8080/api/carts/${cartId}`,
                    {
                        method: "GET",
                    }
                );
                const cart = await payload.json();
                console.log("carro", cart);
                productsDiv.innerHTML = cart.carts.__v;
            }
        }
    } catch (error) {
        console.log("Error: ", error.message);
    }
};


