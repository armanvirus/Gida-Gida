const express = require('express'),
      hb = require('handlebars'),
      exhbs = require('express-handlebars'),
      mongoose = require('mongoose'),
      app = express(),
      path = require('path'),
      uri = 'mongodb://localhost/gida_gida',
      applicants = require('./db/Applicants')
      PORT = process.env.PORT || 8000;

    //   /*connecting the mongoose*/
      mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true  })
      .then( console.log("mongoose is connected"));

    //   set public dir
      app.use('/public/', express.static(path.join(__dirname, '/public')));

      /*body parser*/
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));

    //   templating engine
    app.set('views', path.join(__dirname,"/views"));
    // app.engine('handlebars', .engine);
    var hbs = exhbs.create({
      // handlebars: allowInsecurePrototypeAccess(hbs),
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
    });
        app.engine('handlebars', hbs.engine);
        app.set('view engine', 'handlebars');

      app.get('/', (req,res)=>{
          res.render('home')
      });

      app.get('/apply', (req,res)=>{
        res.send("<h1>Hello Gida gida applier</h1>")
        });

        app.post('/apply', (req,res)=>{
          const {name,lga,phone,email,course} = req.body;

          var Applicant = new applicants({
            name,
            lga,
            phone,
            email,
            course
          })
            Applicant.save((err,applicant)=>{
              if(err) throw err;
              // send email and msg for successful apllication here

              // and then redired applicant to success page her
              res.send(applicant)

            })
        });

        app.get('/admin/:lga/:course',(req,res)=>{
          const lga = req.params.lga;
          const course = req.params.course;
          res.json({lga,course})
        })

      app.listen(PORT, console.log('the server is working'))