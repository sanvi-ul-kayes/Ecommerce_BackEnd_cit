# Ecommerce_BackEnd_cit

<p>Port number:</p><br>
<h5>localhost:9090</h5><br>
<p>Registration Route:</p><br>
<h5>localhost:9090/api/v1/auth/registartion</h5><br>
<p>Login Route:</p><br>
<h5>localhost:9090/api/v1/auth/login</h5><br>
<h2> Class:4</h2><br>
<p>Generating Token & deleting a Property using .select()</p><br>
<h2>class:5</h2><br>
<p>Generate a cookie ,using Cookie_Parser,<br> no one can enter inside user instead of Admin</p><br>
<p>user Route:</p><br>
<h5>localhost:9090/api/v1/auth/user</h5><br>
<h2>Class:06</h2>
<p>NodeMailer, generating OTP, sending OTP, Send a mail,<br> Hand Coded OTP with duration using setTimeOut</p>
<h2>Class:07</h2><br><p>creating Category, category model ,Upload Images </p>
<h2>class:08</h2><p>TOPICS:Multer Limits,<br>Errorcheck for checking any problem,<br> for using static file used express.static()<br>OTP_verify<br>OTP_resend</p><br>
<p>otp_varify Route:</p><br>
<h5>localhost:9090/api/v1/auth/otp_varify</h5><br>
<p>otp_resend Route:</p><br>
<h5>localhost:9090/api/v1/auth/otp_resend</h5>
<h2>Class:09</h2><br><p>Creating Product Model, Product Controller, Product </p><br><h3>Product Route:</h3><h4>localhost:9090/api/v1/product/addProduct</h4><br>
<h1>class:11</h1><br><P>Delete Category</P><br><h2>Delete category route:</h2><br><h4>localhost:9090/api/v1/category/deleteCategory</h4>
<h1>class:12</h1><br><p>Delete Product Update categtory</p><br><h2>Update Category route:</h2><h4>localhost:9090/api/v1/category/updateCategory</h4><br><h2>Delete Product ROute:</h2><br><h4>localhost:9090/api/v1/product/deleteProduct</h4><br>
<h1>class:13</h1><br><p>In this class I've updated my productController as well as I also create a cart , a cart model and an Order model so in the cart I've linked user and product in it, I also solved the prodlem of update category controller as there was a few mistake, <br> so the topics are:<br>1. A Cart controller, <br>2.Cart Model, 3.Order Model<br> The API's are given below:</p><br><h2>Add To Cart Route:</h2><br><h5>//localhost:9090/api/v1/cart/createCart</h5><br><h2>Single User Cart Route:</h2><br><h5>//localhost:9090/api/v1/cart/singleUserCart</h5>
<h1>class:14</h1><br><p>In this class we have created <br>a increment cart controller<br>a decrement cart controller &<br> delete cart controller <br><b>In increment cart controller</b> we also defined stock so that no user can cart a product more then it's stock,<b>In decrement cart controller</b>we make a condition so that no one can minus cart number less then 1<b>in delete cart controller</b>, we are using this controller so that a user can frequently delete cart at a time to get a good UI</p><br><h2>Increment cart controller</h2><br><h3>localhost:9090/api/v1/cart/incrementCart</h3><br><h2>Decrement cart controller</h2><br><h3>localhost:9090/api/v1/cart/decrementCart</h3><br><h2>Delete Cart controller</h2><br><h3>localhost:9090/api/v1/cart/deleteCart</h3>
