import app from './app'

app.listen(process.env.PORT || 8081, () => {
    if (process.env.NODE_ENV === `production`) return

    console.log(`listening on: http://localhost:8081`)
})
