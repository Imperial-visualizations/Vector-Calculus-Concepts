
// Code for navigation functionality in visualisations main screen using Vue

let app = new Vue ({

    el: "#app",

    data: {
        // Data required including variables associated with visible sections, script paths and booleans reflecting state of vis
        scrollPos: 0,
        currentTitle: 0,
        currentSection: 0,
        sectionTops: [],
        sectionBottoms: [],
        sectionTitleLong: ["Introduction", "Gradient", "Divergence", "Curl"],
        sectionTitleShort: ["1","2","3","4"],
        sectionTitle: [],
        hoverPos: '',
        hoverTitle: false,
        mouseX: '',
        n: "",
        journeyHeightOld: "",
        journeyHeightNew: "",
        rightScripts: [
            [],
            [],
            [],
            [],
        ],
        removeScript: "",
        addScript: "",
        firstRunDone: false,
        SubSection: [1, 1, 1],
        rightSubScripts: [
            [
                [],
                [],
            ],
            [
                [],
                [],
            ],
            [
                [],
                [],
            ],
            [
                [],
                [],
            ],
        ],
    },

    methods: {

        // Function called on scrolling of of left panel to indicate distance scrolled down journey content div
        scrollFunc: function () {
            // function only works once sectionPos has run at least once (in mounted)
            if (app.firstRunDone === true) {
                app.scrollPos = document.querySelectorAll(".journey")[0].scrollTop;
                app.changeTitle();
                app.changeSec();
            }
        },

        handleElement: function (section) {
            // update currentSection variable if user scrolls past the top edge of its corresponding section on left side
            let topSection = document.querySelectorAll("#"+"sc"+section)[0].offsetTop - 2;
            let bottomSection = topSection + document.querySelectorAll("#"+"sc"+section)[0].offsetHeight - 2;
            if (app.scrollPos >= topSection && app.scrollPos < bottomSection) {
                app.currentTitle = section;
            }
        },

        changeTitle:  function () {
            for (let i=1; i<=app.n; i++) {
                app.handleElement(i)
            }},

        changeSec: debounce(function () {
          app.currentSection = app.currentTitle;
        }, 200),

        swapTitles: function (newValue, oldValue) {
            for (let i=1; i<=app.n; i++) {
                if (i !== newValue) {
                    app.sectionTitle[i-1] = app.sectionTitleShort[i-1];
                } else {
                    setTimeout (function () {app.sectionTitle[i-1] = app.sectionTitleLong[i-1];}, 20);
                    setTimeout (function () {app.$forceUpdate();}, 100);
                }
            }
        },

        // Function called every x seconds to check if section div sizes have changed and recalculate scroll positions if so
        // Div sizes may change if window re-sized or if a subsection is expanded/collapsed
        sectionPos: function () {
            this.$nextTick (function () {
                let overallTop = document.querySelectorAll("#sc1")[0].offsetTop;
                for (let i=1; i<=app.n; i++) {
                    if (i<app.n) {
                        app.sectionTops[i-1] = (document.querySelectorAll("#"+"sc"+i)[0].offsetTop - overallTop);
                        app.sectionBottoms[i-1] = (app.sectionTops[i-1] + document.querySelectorAll("#"+"sc"+i)[0].offsetHeight);
                    } else {
                        app.sectionTops[i-1] = (document.querySelectorAll("#"+"sc"+i)[0].offsetTop - overallTop);
                        app.sectionBottoms[i-1] = (app.sectionTops[i-1] + document.querySelectorAll("#"+"sc"+i)[0].offsetHeight - document.querySelectorAll(".journey")[0].offsetHeight);
                    }
                }
            })
        },

        // Function activated when button in nav/progress bar clicked to scroll automatically to relevant section
        scrollTo: function (event) {
            document.querySelectorAll("#"+"sc"+event.currentTarget.dataset.no)[0].scrollIntoView({behavior: "smooth"});
        },

        // Same as above but for subsections
        // Delay added to allow time for div size changes
        // --------------CHANGE------------------------
        // subScrollTo: function (event) {
        //     let scrollTarget = event.currentTarget;
        //     if (scrollTarget.id === "ssh" + app.SubSection) {
        //         scrollTarget.scrollIntoView();
        //     }
        // },

        // Updates derivationSubSection variable to reflect active subsection(s)
        // --------------CHANGE------------------------
        updateSubSection: function (newSubSection) {
            if (app.derivationSubSection !== newSubSection) {
                app.derivationSubSection = newSubSection;
            } else {
                app.derivationSubSection = 0;
            }
            app.$forceUpdate();
        },

        hoverPosUpdate: function (event) {
            app.hoverPos = parseFloat(event.currentTarget.dataset.no)
        },

        selectHover: function () {
            if (app.currentTitle !== app.hoverPos) {
                app.hoverTitle=app.sectionTitleLong[app.hoverPos-1]
            } else {
                app.hoverTitle=false
            }
        },

        updateMouseX: function(event) {
            // pass event object, bound to mouse move with update
            app.mouseX = event.clientX -15;
        },

        hideShowToggle: function (event) {
            let toggleTarget = event.currentTarget.querySelectorAll('span')[0].innerHTML;
            if (toggleTarget === "Show") {
                event.currentTarget.querySelectorAll('span')[0].innerHTML = "Hide"
            } else {
                event.currentTarget.querySelectorAll('span')[0].innerHTML = "Show"
            }
        }
    },

    watch: {

        currentTitle: function (newValue, oldValue) {
        // Updates current section title to display in full in nav/progress bar whilst minimising other section titles
            app.swapTitles(newValue, oldValue)
        },

        currentSection: function (newValue, oldValue) {

            // Removes and adds scripts depending on which section is at top of visible part of journey
            document.querySelectorAll('.rightScriptSpace')[0].innerHTML = "";
            for (let i=1; i<=app.rightScripts[newValue-1].length; i++) {
                app.addScript = document.createElement("script");
                app.addScript.id ="rightScriptS" + newValue + "E" + i;
                app.addScript.src = (app.rightScripts[newValue-1][i-1]);
                app.addScript.async = false;
                document.querySelectorAll('.rightScriptSpace')[0].appendChild(app.addScript);
            }
            // Code to deal with loading / unloading appropriate scripts when entering / leaving section 2 as the scripts depend on which subsection is active
            if (oldValue === 2) {
                document.querySelectorAll('.derivationScriptSpace')[0].innerHTML = "";
            }
            if (newValue === 2) {
                if (app.derivationSubSection !==3) {
                    for (let i=1; i<=app.derivationScripts[0].length; i++) {
                        app.addScript = document.createElement("script");
                        app.addScript.id ="derivationScriptS" + 0 + "E" + i;
                        app.addScript.src = (app.derivationScripts[0][i-1]);
                        app.addScript.async = false;
                        document.querySelectorAll('.derivationScriptSpace')[0].appendChild(app.addScript);
                    }
                    setTimeout(function () {
                        if (app.derivationSubSection > 3) {
                            document.querySelectorAll('#opt' + (app.derivationSubSection - 3))[0].setAttribute("selected", "true");
                            document.querySelectorAll('#SelectSec2Sub1')[0].setAttribute("disabled", "true");
                            document.querySelectorAll('#scrollSec2Sub1')[0].style.display = "none";
                            setTimeout(function () {
                                selectorFuncSec2Sub0();
                                document.querySelectorAll("#subSecTitle")[0].innerHTML=document.querySelectorAll("#opt"+(app.derivationSubSection-3))[0].title;
                                document.querySelectorAll("#subSecTitle")[0].style.display="block";
                            }, 200);
                        }
                    }, 200);
                } else {
                    for (let i=1; i<=app.derivationScripts[1].length; i++) {
                        app.addScript = document.createElement("script");
                        app.addScript.id ="derivationScriptS" + 1 + "E" + i;
                        app.addScript.src = (app.derivationScripts[1][i-1]);
                        app.addScript.async = false;
                        document.querySelectorAll('.derivationScriptSpace')[0].appendChild(app.addScript);
                    }
                }
            }
        },
        // --------------CHANGE------------------------
        derivationSubSection: function (newValue, oldValue) {
            // Removes and adds scripts depending on which subsection is active when on section 2

            document.querySelectorAll('.derivationScriptSpace')[0].innerHTML = "";
            if (app.currentSection === 2) {
                if (newValue !==3) {
                    for (let i=1; i<=app.derivationScripts[0].length; i++) {
                        app.addScript = document.createElement("script");
                        app.addScript.id ="derivationScriptS" + 0 + "E" + i;
                        app.addScript.src = (app.derivationScripts[0][i-1]);
                        app.addScript.async = false;
                        document.querySelectorAll('.derivationScriptSpace')[0].appendChild(app.addScript);
                    }
                    // locks function displayed to show only specific example if subsection about specific function is active
                    setTimeout(function () {
                        if (oldValue > 3) {
                            document.querySelectorAll('#opt' + (oldValue - 3))[0].removeAttribute("selected");
                            document.querySelectorAll('#SelectSec2Sub1')[0].removeAttribute("disabled");
                            document.querySelectorAll("#subSecTitle")[0].style.display = "none";
                            document.querySelectorAll('#scrollSec2Sub1')[0].style.display = "block";
                        }
                        if (newValue > 3) {
                            document.querySelectorAll('#opt' + (newValue - 3))[0].setAttribute("selected", "true");
                            document.querySelectorAll('#SelectSec2Sub1')[0].setAttribute("disabled", "true");
                            document.querySelectorAll('#scrollSec2Sub1')[0].style.display = "none";
                            setTimeout(function () {
                                selectorFuncSec2Sub0();
                                document.querySelectorAll("#subSecTitle")[0].innerHTML=document.querySelectorAll("#opt"+(newValue-3))[0].title;
                                document.querySelectorAll("#subSecTitle")[0].style.display="block";
                            }, 200);
                        }
                    }, 200);
                } else {
                    for (let i=1; i<=app.derivationScripts[1].length; i++) {
                        app.addScript = document.createElement("script");
                        app.addScript.id ="derivationScriptS" + 1 + "E" + i;
                        app.addScript.src = (app.derivationScripts[1][i-1]);
                        app.addScript.async = false;
                        document.querySelectorAll('.derivationScriptSpace')[0].appendChild(app.addScript);
                    }
                }
                if (oldValue !== 0) {
                    document.querySelectorAll("ssh" + oldValue)
                }
            }
        },
    },

    mounted () {
        // --------------CHANGE------------------------
        // $nextTick ensures initial functions only run once Vue is initialised sufficiently
        this.$nextTick ( function () {
            // makes n equal to total number of sections
            app.n = document.querySelectorAll(".section-container").length;
            // calculates initial div section positions in journey with respect to the top
            this.sectionPos();
            app.firstRunDone = true;
            // runs scrollFunc once on loading in case page does not load with top of journey in view
            app.scrollFunc();
            // checks if journey div height changes every x seconds
            // if it does change, re-runs sectionPos to calculate section div positions
            app.journeyHeightOld = document.querySelectorAll(".journey")[0].scrollHeight;
            window.setInterval(() => {
                app.journeyHeightNew = document.querySelectorAll(".journey")[0].scrollHeight;
                if (app.journeyHeightOld !== app.journeyHeightNew) {
                    app.journeyHeightOld = app.journeyHeightNew;
                    this.sectionPos();
                }
            },2000);
            // collapses collapsible divs once mathJax has loaded fully
            setTimeout(function () {MathJax.Hub.Queue(function () {
               let collapseDivs = document.querySelectorAll(".collapse:not(#introContentContainer)");
               for (let i=0; i<collapseDivs.length; i++) {
                   collapseDivs[i].classList.remove("show");
               }
            })
            }, 1000)
        }
    )},
});