function appleMarket(num){
    let apples=num
    function home(){
        console.log(apples);
        let glass=jar()
        function jar(){
            return "juice"
        }
        console.log(glass);
    }
    home()
}
appleMarket(50)