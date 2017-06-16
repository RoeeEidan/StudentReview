// Here im creating a globle const that will contain all the methods that are not 
// relaited to the state of the application ( mostly DOM manipulation )

const _ = function () {


    function loadHomePage() {
        if (myState.isMobile()) {
            loadHomeMobile()
        } else {
            loadHomeDeskTop()
        }
    }


    // <-- Event Listners Start -->

    function addEventListners() {
        addEventsToInputSearch();

        if (myState.isMobile()) {
            addEnentToMobileOpenMenuIcon();
            addEnentToMobileCloseMenuIcon();
            addEventToApplyFiltersOpenIcone();
            addEventToApplyFiltersCloseIcone();
        }
    }

    function addEventsToInputSearch() {
        //  Here im creating the option to click and hover on 
        //  the search icon of the input because he is a backgound image.
        let input = document.getElementById('searchInput');
        if (input) {
            input.addEventListener('click', (e) => {
                // Checking if the click is on the search background by calculating the X possition of it.
                const start = input.getBoundingClientRect().left; // X possition where the input starts.
                const click = e.pageX; // X possition the was clicked.
                const width = input.offsetWidth; // Width of the element.

                // Min X Possition to be on Background 
                let min;

                // Max X Possition to be on Background 
                let max;

                if (myState) {
                    if (myState.isMobile()) {
                        min = start + width - 25;
                        max = start + width + 5;
                    } else {
                        max = start + width - 15;
                        min = start + width - 40;
                    }
                } else {
                    console.error('myState is not defind')
                }

                if (click >= min && click <= max) {
                    // Do the search
                    console.log('yesss')
                }
            });

            // Here Im doing the same thing I did above but on evry move of the mose on the input,
            // isOver will be an indicator wether the mouseover was updated yet or not.
            let isOver = false;
            input.addEventListener('mousemove', (e) => {
                const start = input.getBoundingClientRect().left;
                const click = e.pageX;
                const width = input.offsetWidth;
                if (click >= (start + width - 40) && click <= (start + width - 15)) {
                    if (!isOver) {
                        isOver = true;
                        input.style.cursor = "pointer";
                    }
                } else {
                    if (isOver) {
                        isOver = false;
                        input.style.cursor = "";
                    }
                }
            })
        }
    }





    // <-- Adding Event Listners Start  -->

    function addEnentToMobileOpenMenuIcon() {
        if (document.getElementById('mobileMenuIcon')) {
            document.getElementById('mobileMenuIcon').addEventListener('click', onMobileMenuClick)
            return true;
        } else {
            console.error('document.getElementById("mobileMenuIcon") is not defind');
            return false;
        }
    }


    function addEnentToMobileCloseMenuIcon() {
        if (document.getElementById('mobileMenuRemoveIcon')) {
            document.getElementById('mobileMenuRemoveIcon').addEventListener('click', onMobileRemoveMenuClick)
            return true;
        } else {
            console.error('document.getElementById("mobileMenuRemoveIcon") is not defind');
            return false;
        }
    }



    function addEventToApplyFiltersOpenIcone() {
        if (document.getElementById('mobileApplyFilters')) {
            document.getElementById('mobileApplyFilters').addEventListener('click', onMobileApplyFiltersClick);
            return true;
        } else {
            console.error('document.getElementById("mobileApplyFilters") is not defind')
            return false;
        }
    }

    function addEventToApplyFiltersCloseIcone() {
        if (document.getElementById('mobileApplyFiltersRemoveIcon')) {
            document.getElementById('mobileApplyFiltersRemoveIcon').addEventListener('click', onMobileRemoveApplyFiltersClick);
            return true;
        } else {
            console.error('document.getElementById("mobileApplyFiltersRemoveIcon") is not defind')
            return false;
        }
    }

    // <-- Adding Event Listners End  -->


    //  <-- Menu Functions Start  -->


    let isFirstClick = true; // The first click happens on the apply filters open menu click so this var will indicate if its that click.

    function outSideMobileMenuEventListener(event) {
        if (document.getElementById('mobileMenu')) {
            var specifiedElement = document.getElementById('mobileMenu');
            var isClickInside = specifiedElement.contains(event.target);
            if (!isClickInside && !isFirstClick) {
                specifiedElement.style.display = 'none';
                document.removeEventListener('click', outSideMobileMenuEventListener);
            } else if (!isClickInside) {
                isFirstClick = false;
            } else { }
        } else {
            console.error("document.getElementById('mobileMenu') is not defind")
        }
    }


    function onMobileMenuClick() {
        if (document.getElementById('mobileMenu')) {
            document.getElementById('mobileMenu').style.display = 'block';
        } else {
            console.error('document.getElementById("mobileMenu") is not defind')
        }
        isFirstClick = true;
        document.addEventListener('click', outSideMobileMenuEventListener)

    }

    function onMobileRemoveMenuClick() {
        if (document.getElementById('mobileMenu')) {
            document.getElementById('mobileMenu').style.display = 'none';
            document.removeEventListener('click', outSideMobileMenuEventListener);
        } else {
            console.error('document.getElementById("mobileMenu") is not defind')
        }
    }

    //  <-- Menu Functions End  -->




    //  <-- ApplyFilters Functions Start  -->

    let isApplyFiltersFirstClick = true;
    function outSideApplyFiltersEventListener(event) {
        if (document.getElementById('mobileOpenApplyFiltersDiv')) {
            var specifiedElement = document.getElementById('mobileOpenApplyFiltersDiv');
            var isClickInside = specifiedElement.contains(event.target);
            if (!isClickInside && !isApplyFiltersFirstClick) {
                specifiedElement.style.display = 'none';
                if (document.getElementById('blur')) {
                    document.getElementById('blur').className = '';
                    document.getElementById('blur').style.maxHeight = '';
                } else {
                    console.error("document.getElementById('blur') is not defind")
                }
                document.removeEventListener('click', outSideApplyFiltersEventListener);
            } else if (!isClickInside) {
                isApplyFiltersFirstClick = false;
            } else { }
        } else {
            console.error("document.getElementById('mobileOpenApplyFiltersDiv') is not defind")
        }
    }

    function onMobileApplyFiltersClick() {
        if (document.getElementById('mobileOpenApplyFiltersDiv')) {
            let applyFiltersDiv = document.getElementById('mobileOpenApplyFiltersDiv');
            applyFiltersDiv.style.display = 'block';
            if (document.getElementById('blur')) {
                let blurBackdroundDiv = document.getElementById('blur');
                blurBackdroundDiv.className = 'blur';
                console.log( document.getElementsByClassName('mobileInnerSearchBoxWrapper')[0].offsetHeight , window.innerHeight );
                if (document.getElementsByClassName('mobileInnerSearchBoxWrapper')[0]) {
                    let divHeight = document.getElementsByClassName('mobileInnerSearchBoxWrapper')[0].offsetHeight + 20 ; // 20 is the 10px from top and bottom of possition absolut
                    let windowHeight = window.innerHeight -38; // this -38 is the heigh of top menu bar 
                    // This sets the blur size of the screan
                    blurBackdroundDiv.style.maxHeight = (  divHeight  >= windowHeight  ?  divHeight  : window.innerHeight );
                } else {
                    console.error(" document.getElementsByClassName('mobileInnerSearchBoxWrapper')[0] is not defind ")
                }
            } else {
                console.error("document.getElementById('blur') is not defind")
            }
            document.getElementById('mobileOpenApplyFiltersDiv').style.display = 'block';
            isApplyFiltersFirstClick = true;
            document.addEventListener('click', outSideApplyFiltersEventListener)
        } else {
            console.error('document.getElementById("mobileApplyFilters") is not defind')
        }
    }

    function onMobileRemoveApplyFiltersClick() {
        if (document.getElementById('mobileOpenApplyFiltersDiv')) {
            document.getElementById('mobileOpenApplyFiltersDiv').style.display = 'none';
            if (document.getElementById('blur')) {
                document.getElementById('blur').className = '';
                document.getElementById('blur').style.maxHeight = '';
            } else {
                console.error("document.getElementById('blur') is not defind ")
            }
            document.removeEventListener('click', outSideApplyFiltersEventListener);
        } else {
            console.error('document.getElementById("mobileMenu") is not defind')
        }
    }

    //  <-- ApplyFilters Functions End  -->

    // <-- Event Listners End -->




    //  <-- MOBILE LOAD FUNKTIONS START -->

    function loadHomeMobile() {
        loadBasicMobileStructer();
        loadMobileNavBar();
        loadMobileList();
        loadMobileFooter();
    }

    function loadBasicMobileStructer() {
        if (document.getElementById('homeMobileTemplate')) {
            let template = document.getElementById('homeMobileTemplate').innerHTML;
            let html = ejs.compile(template)({ locals: { number: Math.random() } });
            document.getElementById('root').innerHTML = html;
        } else {
            console.error(" document.getElementById('homeMobileTemplate') is not defind ")
        }
    }

    function loadMobileNavBar() {
        if (document.getElementById('mobileNavBarTemplate')) {
            let template = document.getElementById('mobileNavBarTemplate').innerHTML;
            let html = ejs.compile(template)({ locals: { number: Math.random() } });
            document.getElementById('mobileNavBarDiv').innerHTML = html;
        } else {
            console.error(" document.getElementById('mobileNavBarTemplate') is not defind ")
        }
    }

    function loadMobileList() {
        if (document.getElementById('mobileSingleUniversityTemplate') && myState) {

            // This Varible Will Hold a String Of All The Html Needs To Be Rendered.
            let universityListCardsHtml = '';


            // This is getting the first item that needs to be rendered of the list.
            let i = ((myState.getCurrnetPage() - 1) * 10) + 1;

            // Loops 8 Times     SHOULD BE UPDATED WHEN ADDING ACTION OF CHANGING PAGES.
            while (i <= (myState.getCurrnetPage() * 10)) {
                let template = document.getElementById('mobileSingleUniversityTemplate').innerHTML;
                universityListCardsHtml += ejs.compile(template)({ locals: { number: i } });
                i++
            }

            // This adds the the pageTracker bar to the Html.
            if (document.getElementById('mobilePageTrackerTemplate')) {
                let pageTrackerTemplate = document.getElementById('mobilePageTrackerTemplate').innerHTML;
                universityListCardsHtml += ejs.compile(pageTrackerTemplate)({ locals: { currentPage: myState.getCurrnetPage() } });
            } else {
                console.error(" document.getElementById('mobilePageTrackerTemplate') is not defind")
            }


            // Manipulates the Dom.
            if (document.getElementById('mobileListOfUniversitiesDiv')) {
                document.getElementById('mobileListOfUniversitiesDiv').innerHTML = universityListCardsHtml;
            } else {
                console.error(' Element is not defind ')
            }

            return true;

        } else {
            console.error('document.getElementById("singleUniversityCardTemplate") or myState is not defind');
            return false;
        }
    };

    function loadMobileFooter() {
        if (document.getElementById('mobileFooterTemplate')) {
            let footerTemplate = document.getElementById('mobileFooterTemplate').innerHTML;
            let footerHtml = ejs.compile(footerTemplate)({ locals: { number: Math.random() } });
            if (document.getElementById('mobileFooterDiv')) {
                document.getElementById('mobileFooterDiv').innerHTML = footerHtml;
                return true;
            }else{
                console.error("document.getElementById('mobileFooterDiv') is not defind.");
                return false;
            }
        } else {
            console.error("document.getElementById('mobileFooterTemplate') is not defind.")
            return false;
        }
    }


    //  <-- MOBILE LOAD FUNKTIONS END -->






    //  <-- DESKTOP FUNKTIONS START -->

    function loadHomeDeskTop() {

        loadBasicDeskTopStructer();

        loadNavBar();

        loadSearchBox();

        loadBody();

        loadFooter();

        // Must Be After The resultBodyDiv Dom Manipulation Because The Element Is Part Of It
        loadList();
    };

    function loadBasicDeskTopStructer() {
        if (document.getElementById('homeDeskTopTemplate')) {
            let template = document.getElementById('homeDeskTopTemplate').innerHTML;
            let html = ejs.compile(template)({ locals: { number: Math.random() } });
            document.getElementById('root').innerHTML = html;
        }
    }


    function loadNavBar() {
        if (document.getElementById('navBarTemplate')) {
            let navBarTemplate = document.getElementById('navBarTemplate').innerHTML;
            let navBarHtml = ejs.compile(navBarTemplate)({ locals: { number: Math.random() } });
            document.getElementById('navBarDiv').innerHTML = navBarHtml;
            return true;
        }
        return false;
    }


    function loadSearchBox() {
        if (document.getElementById('searchBoxTemplate')) {
            let searchBoxTemplate = document.getElementById('searchBoxTemplate').innerHTML;
            let searchBoxHtml = ejs.compile(searchBoxTemplate)({ locals: { number: Math.random() } });
            document.getElementById('searchDiv').innerHTML = searchBoxHtml;
            return true;
        }
        return false;
    }


    function loadBody() {
        if (document.getElementById('resultBodyTemplate')) {
            let resultBodyTemplate = document.getElementById('resultBodyTemplate').innerHTML;
            let resultBodyHtml = ejs.compile(resultBodyTemplate)({ locals: { number: Math.random() } });
            document.getElementById('resultBodyDiv').innerHTML = resultBodyHtml;
        }
    }


    function loadFooter() {
        if (document.getElementById('footerTemplate')) {
            let footerTemplate = document.getElementById('footerTemplate').innerHTML;
            let footerHtml = ejs.compile(footerTemplate)({ locals: { number: Math.random() } });
            document.getElementById('footerDiv').innerHTML = footerHtml;
            return true;
        }
        return false;
    }



    // loadList is getting the state from the myState object and loads the currct list of articles.
    function loadList() {
        if (document.getElementById('singleUniversityCardTemplate') && myState) {

            // This Varible Will Hold a String Of All The Html Needs To Be Rendered.
            let universityListCardsHtml = '';


            // This is getting the first item that needs to be rendered of the list.
            let i = ((myState.getCurrnetPage() - 1) * 8) + 1;

            // Loops 8 Times     SHOULD BE UPDATED WHEN ADDING ACTION OF CHANGING PAGES.
            while (i <= (myState.getCurrnetPage() * 8)) {
                let template = document.getElementById('singleUniversityCardTemplate').innerHTML;
                universityListCardsHtml += ejs.compile(template)({ locals: { number: i } });
                i++
            }

            // This adds the the pageTracker bar to the Html.
            let pageTrackerTemplate = document.getElementById('pageTrackerTemplate').innerHTML;
            universityListCardsHtml += ejs.compile(pageTrackerTemplate)({ locals: { currentPage: myState.getCurrnetPage() } });

            // Manipulates the Dom.
            if (document.getElementById('universityResultListDiv')) {
                document.getElementById('universityResultListDiv').innerHTML = universityListCardsHtml;
            } else {
                console.error(' Element is not defind ')
            }

            return true;

        } else {
            console.error('document.getElementById("singleUniversityCardTemplate") or myState is not defind');
            return false;
        }
    };


    //  <-- DESKTOP FUNKTIONS END -->


    return {
        loadList: loadList,
        loadHomePage: loadHomePage,
        addEventListners: addEventListners,
    }

}();




