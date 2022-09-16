module.exports = client => {
    process.on('unhandledRejection', (reason, p) => {
         console.log(' [antiCrash] :: Unhandled Rejection/Catch');
         console.log(reason, p);
     });
     process.on("uncaughtException", (err, origin) => {
         console.log(' [antiCrash] :: Uncaught Exception/Catch');
         console.log(err, origin);
     }) 
     process.on('uncaughtExceptionMonitor', (err, origin) => {
         console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
         console.log(err, origin);
     });
     process.on('multipleResolves', (type, promise, reason) => {
         console.log(' [antiCrash] :: Multiple Resolves');
         console.log(type, promise, reason);
     });

     process.on('beforeExit', (code) => {
        console.log('Process beforeExit event with code: ', code);
      });
      
      process.on('exit', (code) => {
        console.log('Process exit event with code: ', code);
      });
      process.on('rejectionHandled', (promise) => {
        unhandledRejections.delete(promise);
      });
 }