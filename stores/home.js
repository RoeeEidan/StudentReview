// Here im creating the Object that will own all the information the application needs.
// The Object is a JavaScript Clousure that lives in its own scope and can be accessed only by the methods it returns.

const myState = function () {
    // <-- VALUES Start -->

    let sortBy = 'Best';

    let myData = [];

    let desplayedData = []; // Not in use yet

    let currnetPage = 1;

    // Checks if the user is on Mobile/Tablet and returs a boolian
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    let filters = {};


    // <-- VALUES Start -->


    // <----  METHODS Start  ----->


    // <----- Sort By Start ----->

    function isSortBy(val) {
        if ( sortBy === val ) {
            return true
        } else {
            return false
        }
    }


    function setSortBy(val) {
        switch (val) {
            case 'Best':
                sortBy = 'Best'
                return true
            case 'A-Z':
                sortBy = 'A-Z'
                return true
            case 'Price':
                sortBy = 'Price'
                return true
            case 'Company Rating':
                sortBy = 'Company Rating'
                return true
            default:
                console.error('Sort By Value Must Be One Of The Options');
                return false
        }
    }

    // <----- Sort By End ----->

    // <----- Data Start ----->

    function getData() {
        return myData
    }

    function loadData(data) {
        if (myData) {
            myData = data;
            return true;
        } else {
            console.error('myData is not defidnd')
            return false;
        }
    }

    // <----- Sort By End ----->

    // <-- isMobile -->
    function isMobile() {
        return mobile;
    }


    // <---  User Navegation Start  --->

    function increase() {
        if (((currnetPage) * 8) < myData.length) {
            currnetPage++
            return true
        } else {
            console.log('No More Pages To Increase ')
            return false
        }
    }

    function decrease() {
        if (currnetPage > 1) {
            currnetPage--
            return true
        } else {
            console.log('No More Pages To Decrease ')
            return false
        }
    }

    function getCurrnetPage() {
        return currnetPage
    }

    function getDataLength() {
        return myData.length;
    }

    // <---  User Navegation End  --->


    // <--- Search Filters Applied Start  --->

    function setFilterObject({ degreeType , location , major , price }){
        if(degreeType){
            filters.degreeType = degreeType;
        }
        if(location){
            filters.location = location;
        }
        if(major){
            filters.major = major;
        }
        if(price){
            filters.price = price;
        }
    }

    function getFiltersApplied(){
        return filters;
    }

    // <--- Search Filters Applied End  --->


    // <----  METHODS End  ----->

    return {
        getCurrnetPage: getCurrnetPage,
        increase: increase,
        decrease: decrease,
        isMobile: isMobile,
        loadData: loadData,
        getData: getData,
        isSortBy: isSortBy,
        setSortBy: setSortBy,
        getDataLength: getDataLength,
        
        // Search Filters
        getFiltersApplied: getFiltersApplied,
        setFilterObject: setFilterObject,
    }
}();


myState.loadData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 2, 2, 2, 2, 2, 2, , 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, , 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
myState.setFilterObject({price: '$$$' });
myState.setFilterObject({location: 'Brazil' });
myState.setFilterObject({degreeType:'Bachlor' });



