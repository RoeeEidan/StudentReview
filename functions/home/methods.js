// Here im creating a globle const that will contain all the methods that are not 
// relaited to the state of the application ( mostly DOM manipulation )

const _ = function () {

    function loadHomePage() {

        loadNavBar();
        loadSearchBox();
        loadBody();
        loadFooter();

        // Must Be After The resultBodyDiv Dom Manipulation Because The Element Is Part Of It
        loadList();
    };

    function loadFooter() {
        if (document.getElementById('footerTemplate')) {
            let footerTemplate = document.getElementById('footerTemplate').innerHTML;
            let footerHtml = ejs.render(footerTemplate);
            document.getElementById('footerDiv').innerHTML = footerHtml;
            return true;
        }
        return false;
    }

    function loadNavBar() {
        if (document.getElementById('navBarTemplate')) {
            let navBarTemplate = document.getElementById('navBarTemplate').innerHTML;
            let navBarHtml = ejs.render(navBarTemplate);
            document.getElementById('navBarDiv').innerHTML = navBarHtml;
            return true;
        }
        return false;
    }

    function loadSearchBox() {
        if (document.getElementById('searchBoxTemplate')) {
            let searchBoxTemplate = document.getElementById('searchBoxTemplate').innerHTML;
            let searchBoxHtml = ejs.render(searchBoxTemplate);
            document.getElementById('searchDiv').innerHTML = searchBoxHtml;
            return true;
        }
        return false;
    }

    function loadBody() {
        if (document.getElementById('resultBodyTemplate')) {
            let resultBodyTemplate = document.getElementById('resultBodyTemplate').innerHTML;
            let resultBodyHtml = ejs.render(resultBodyTemplate);
            document.getElementById('resultBodyDiv').innerHTML = resultBodyHtml;
        }
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

    return {
        loadNavBar: loadNavBar,
        loadBody: loadBody,
        loadFooter: loadFooter,
        loadList: loadList,
        loadHomePage: loadHomePage
    }
}();