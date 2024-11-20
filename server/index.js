const express = require( "express" )
const app = express();

const cors = require( 'cors' );
const cookieParser = require( "cookie-parser" );

app.use( cookieParser() );
app.use( cors( { origin: process.env.CLIENT, credentials: true, } ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

require( "dotenv" ).config();

const PORT = process.env.PORT || 5000;


const LoginRouter = require( "./Routes/LoginRoute" );
const SignupRouter = require( "./Routes/SignupRoute" );
const DashboardRouter = require( "./Routes/DashBoardRoute" )
const WorkoutRouter = require( "./Routes/WorkoutRoute" );
const YogaRouter = require( "./Routes/YogaRoute" );
const CardioRouter = require( "./Routes/CardioRoute" );
const ProfileRouter = require( "./Routes/ProfileRoute" );
const DietRouter = require( "./Routes/DietRouter" );
const ScheduleRouter = require( "./Routes/ScheduleRoute" );


const { checkAuth } = require( "./Middlewares/Authenticator" )

const connectMongoDB = require( './Config/Connect' );
connectMongoDB( process.env.MONGO ).then( () => console.log( "MongoDB connected" ) ).catch( ( err ) => console.log( "Error Occured: ", err ) );
const { LoginValidation, SignupValidation } = require( "./Middlewares/AuthValid" );


app.use( "/login", LoginValidation, LoginRouter );
app.use( "/signup", SignupValidation, SignupRouter );
app.use( "/dashboard", DashboardRouter );
app.use( "/workout", checkAuth, WorkoutRouter );
app.use( "/yoga", checkAuth, YogaRouter );
app.use( "/cardio", checkAuth, CardioRouter );
app.use( "/profile", checkAuth, ProfileRouter );
app.use( "/diet", checkAuth, DietRouter );
app.use( "/schedule", checkAuth, ScheduleRouter );

app.listen( PORT, () => console.log( "Server Started on", PORT ) );