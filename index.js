const http = require('./src/server/http')

http.listen(process.env.PORT || 4040, function() {
    console.log("Server running")
})
