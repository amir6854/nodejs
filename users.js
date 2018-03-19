
var express = require('express')
var app = express()
var mysql = require('mysql')
var path = require('path');
// here is the use  acces user public folder
app.use(express.static(path.join(__dirname, './public')));


// here is user connection
var conn = require('../config');
//here is the use pagination
var paginate = require('express-paginate');

app.get('/', function (req, res) {
    
    conn.query("SELECT * FROM users  ", function (err, rows) {

        if (err) {
            req.flash('error', err)
            res.render('user/index', {
                title: 'User List',
                data: ''
            })
        } else {
            // render to views/user/list.ejs template file
            res.render('user/index', {
                title: 'User List',
                data: rows,

            })
        }

    });
})


app.get('/add', function (req, res) {
    // render to user/add.html template file
    res.render('user/adduser', { title: 'Add Summary' })
})

app.post('/users/add', function (req, res) {

    
    var user = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        is_active: req.body.is_active,

    }

    conn.query('INSERT INTO users SET ?', user, function (err, result) {


        if (err) {
            // req.flash('error', err)
            // redirect to users list page
            res.render('user/addUser', {
                title: 'Add New User',

            })
        } else {
            req.flash('success', 'User Add successfully!')
            // redirect to users list page
            res.render('user/addUser', {
                title: 'Add New User',
                username: '',
                password: '',
                firstname: '',
                lastname: ''

            })
        }

    })

});

app.get('/users/delete/(:id)', function (req, res) {

    var user = { id: req.params.id }
    conn.query('DELETE FROM users WHERE id = ' + req.params.id, user, function (err, result) {
        //if(err) throw err
        if (err) {
            req.flash('error', err)
            // redirect to users list page
            res.redirect('/')
        } else {
            req.flash('success', 'User deleted successfully! id = ' + req.params.id)
            // redirect to users list page
            res.redirect('/')
        }
    })

})

app.get('/edit/(:id)', function (req, res) {
     console.log("Dffa");

    conn.query('SELECT * FROM users WHERE id = ' + req.params.id, function (err, rows, ) {
        if (err) throw err

        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'User not found with id = ' + req.params.id)
            // res.redirect('/users')
        }
        else { // if user found
            // render to views/user/edit.ejs template file
            res.render('user/edit', {
                title: 'Edit User',
                //data: rows[0],
                id: rows[0].id,
                username: rows[0].username,
                password: rows[0].password,
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                is_active: rows[0].is_active
            })
        }

    })

})


app.post('/users/edit/:id', function (req, res, next) {

    console.log("gfgd");

    res.render('user/index', {

    })

    // // req.assert('username', 'username is required').notEmpty()           //Validate name
    // // req.assert('password', 'password is required').notEmpty()             //Validate age
    // // req.assert('firstname', 'firstname is required').notEmpty()  
    // // req.assert('lastname', 'lastname is required').notEmpty()   //Validate email
    // // req.assert('is_active', 'is_active is required').notEmpty()  
    // // var errors = req.validationErrors()


    //     var user = {
    //         username: req.body.username,
    //         password: req.body.password,
    //         firstname: req.body.firstname,
    //         lastname: req.body.lastname,
    //         is_active: req.body.is_active,

    //     }

    //     connnection.query('UPDATE users SET ? WHERE id = ' + req.params.id, user, function(err, result) {


    //             if (err) {
    //                 // req.flash('error', err)
    //                 // redirect to users list page
    //                 res.render('user/edit', {
    //                     title: 'Add New User',

    //                 })
    //             } else {
    //                 req.flash('success', 'User Add successfully!')
    //                 // redirect to users list page
    //                 res.render('user/edit', {
    //                     title: 'Add New User',
    //                     username: '',
    //                     password: '',
    //                     firstname: '' ,
    //                     lastname: '', 
    //                     is_active: ''




    //                 })
    //             }

    //      })

});



app.post('/users/search', function (req, res) {

    console.log(req.body);

    conn.query('SELECT * from users where username like "%' + req.body.username + '%"', function (err, result) {
        // SELECT * from users where name like "%amir%"


        if (err) {
            req.flash('error', err)
            res.render('user/index', {
                title: 'User Search',
                data: ''
            })
        } else {
            // render to views/user/list.ejs template file
            res.render('user/index', {
                title: 'User Search',
                data: result
            })
        }


    });
});

app.get('/user/short/', function (req, res) {

    conn.query("SELECT * FROM users ORDER BY name ASC", function (err, rows) {
        // SELECT * from users where name like "%amir%"

        if (err) {
            req.flash('error', err)
            res.render('user/index', {
                title: 'User List',
                data: ''
            })
        } else {
            // render to views/user/list.ejs template file
            res.render('user/index', {
                title: 'User List',
                data: rows
            })
        }


    });
});

















module.exports = app;