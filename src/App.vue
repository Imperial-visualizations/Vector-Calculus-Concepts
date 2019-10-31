<template>
  <div id="app">
     <!--   Title of non-current sections to appear on hovering above respective number in navbar     -->
    <div id="hoverTitleSpace" :style="{left: mouseX +'px'}" v-show="hoverTitle !== false">
        {{hoverTitle}}
    </div>
    <!--    Left Side of Window - containing mainly text    -->
    <div class="vis-container left" id="left-container">
        <!--     Dynamic Navigation Bar and Section Headings       -->
        <div class="" id="progress-container">
            <div id="banner-dummy">
                <a href="https://www.imperialvisualisations.com/learn/" title="Return to Homepage">
                    <img id="vis-logo" src="images/VisualisationsLogoWhite2.png">
                </a>
            </div>
            <!--    Journey Toggle Button   -->
            <div id="journeyToggle">
                <div id="navBlock" :class="[showJourney === false ? 'navBlockActive' : '']"
                     @click="toggleJourney">
                    CLICK HERE TO SHOW TEXT AND NAVIGATION
                </div>
                <div :class="[showJourney === false ? 'rotated' : '', 'innerJourneyToggle']"
                     @click="toggleJourney" class="chevron-holder" title="Hide/Show Left Panel">
                    <i class="fas fa-chevron-left"></i>
                </div>
            </div>
            <!--    Dynamic Section Heading Text - overlaid on meters    -->
            <!--    Also act as buttons to navigate between sections    -->
            <div class="" id="overlay" @mousemove="hoverTitle !== false ? updateMouseX($event) : ''">
                <button :class="[currentTitle === 1 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle1"
                        key="sectionTitle1" data-no=1 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[0]}}
                </button>
                <button :class="[currentTitle === 2 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle2"
                        key="sectionTitle2" data-no=2 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[1]}}
                </button>
                <button :class="[currentTitle === 3 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle3"
                        key="sectionTitle3" data-no=3 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[2]}}
                </button>
                <button :class="[currentTitle === 4 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle4"
                        key="sectionTitle4" data-no=4 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[3]}}
                </button>
                <button :class="[currentTitle === 5 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle5"
                        key="sectionTitle5" data-no=5 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[4]}}
                </button>
            </div>
            <!--    Dynamic meters indicating progress through each section    -->
            <meter :class="[currentTitle === 1 ? 'activeMeter' : '']" id="m1" :min="sectionTops[0]"
                   :max="sectionBottoms[0]" :value="scrollPos"></meter>
            <meter :class="[currentTitle === 2 ? 'activeMeter' : '']" id="m2" :min="sectionTops[1]"
                   :max="sectionBottoms[1]" :value="scrollPos"></meter>
            <meter :class="[currentTitle === 3 ? 'activeMeter' : '']" id="m3" :min="sectionTops[2]"
                   :max="sectionBottoms[2]" :value="scrollPos"></meter>
            <meter :class="[currentTitle === 4 ? 'activeMeter' : '']" id="m4" :min="sectionTops[3]"
                   :max="sectionBottoms[3]" :value="scrollPos"></meter>
            <meter :class="[currentTitle === 5 ? 'activeMeter' : '']" id="m5" :min="sectionTops[4]"
                   :max="sectionBottoms[4]" :value="scrollPos"></meter>
        </div>
        <!--    Container for text content split into sections    -->
        <div :class="[showJourney === false ? 'hiddenJourney' : '', 'journey']" id="main-journey" @scroll.passive="scrollFunc">
            <!--    Section Text Containers   -->
            <div class="section-container" id="sc1">
                <div class="placeholder" id="ph1">
                    <hr>
                    <h2 class="text section-head" id="s1">
                        {{sectionTitleLong[0]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p1">
                    In vector calculus, there are three important operations that are related to <span
                        class="mathJaxInline">$ \nabla, $</span> the vector differential operator.
                    <span class="mathJaxInline">$ \nabla $</span> can be operated on both scalar and vector fields.
                    <br><br>
                    <h3 class="section-sub-head">
                        Scalar Field <span class="mathJaxHeading">$ \Omega( \mathbf{r} ) $</span>
                    </h3>
                    A scalar field is a function that outputs a scalar value, given <span
                        class="mathJaxInline">$ n $</span> independent variables in <span class="mathJaxInline">$ \mathbb{R}^n. $</span>
                    It assigns a scalar value to every point in space. A nice example of a scalar field is an elevation
                    map as seen on the right.
                    The elevation value, which is a scalar value, depends on the <span
                        class="mathJaxInline">$ x $</span> and <span class="mathJaxInline">$ y $</span> coordinate
                    values on the map.
                    Contour lines or colours are usually used to represent the "height" of the function value, as seen
                    in the map.
                    Some other examples of scalar fields are temperature of a room, pressure distribution in a fluid
                    etc.
                    <br><br>
                    <h3 class="section-sub-head">
                        Vector Field <span class="mathJaxHeading">$ \mathbf{f}( \mathbf{r} ) $</span>
                    </h3>
                    A vector field is very similar to a scalar field, except that the function outputs a vector, given
                    <span class="mathJaxInline">$ n $</span> independent variables in <span class="mathJaxInline">$ \mathbb{R}^n. $</span>
                    It is used to represent vectorial information.
                    For example, the ocean current map on the right is an example of a vector field that depends on the
                    <span class="mathJaxInline">$ x $</span> and <span class="mathJaxInline">$ y $</span> coordinates.
                    At any position, the function assigns a vector that indicates the speed and direction of the ocean
                    current.
                    Other examples of vector fields are electric and magnetic fields.
                    <br><br>
                    <h3 class="section-sub-head">
                        <span class="mathJaxHeading">$ \nabla \Omega, $</span> <span class="mathJaxHeading">$ \nabla \cdot \mathbf{f}, $</span>
                        <span class="mathJaxHeading">$ \nabla \times \mathbf{f} $</span>
                    </h3>
                    In 3D Cartesian coordinates, <span class="mathJaxInline">$ \nabla $</span> is given by
                    <span class="mathJaxDisplay">
                        $$ \nabla = \mathbf{\hat{i}} \frac {\partial}{\partial x} + \mathbf{\hat{j}} \frac {\partial}{\partial y} + \mathbf{\hat{k}} \frac {\partial}{\partial z}. $$
                    </span>
                    <span class="mathJaxInline">$ \nabla $</span> operates on a scalar field <span
                        class="mathJaxInline">$ \Omega $</span> in one way, that is:
                    <span class="mathJaxDisplay">
                        $$ \nabla \Omega . $$
                    </span>
                    This returns a vector field, which is the gradient field of <span
                        class="mathJaxInline">$ \Omega. $</span>
                    On the other hand, <span class="mathJaxInline">$ \nabla $</span> can operate on a vector field <span
                        class="mathJaxInline">$ \mathbf{f} $</span> in two ways, namely
                    <span class="mathJaxDisplay">
                        $$ \nabla \cdot \mathbf{f} $$
                        and
                        $$ \nabla \times \mathbf{f}, $$
                    </span>
                    which give the divergence (scalar) and the curl (vector) of a vector field respectively.
                    <br><br>
                    In this visualisation suite, we will be placing our focus on the meaning of grad, divergence and
                    curl
                    instead of their mathematical derivations in the following sections,
                    in order to provide a physical intuition to what <span class="mathJaxInline">$ \nabla $</span>
                    means, both microscopically and macroscopically.
                </div>
            </div>
            <div class="section-container" id="sc2">
                <div class="placeholder" id="ph2">
                    <hr>
                    <h2 class="text section-head" id="s2">
                        {{sectionTitleLong[1]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p2">
                    <!--    Sub-Section Tabs    -->
                    <ul class="nav nav-tabs nav-justified">
                        <li :class="[subSection[1] === 1 ? 'shaded' : '', 'active', 'tabLeft']">
                            <a data-toggle="tab" href="#gradDifferential"
                               @click="subScrollTo(2); subSection[1]=1; $forceUpdate();">Differential</a>
                        </li>
                        <li :class="[subSection[1] === 2 ? 'shaded' : '', 'tabRight']">
                            <a data-toggle="tab" href="#gradIntegral"
                               @click="subScrollTo(2); subSection[1]=2; $forceUpdate();">Integral</a>
                        </li>
                    </ul>
                    <!--    Sub-Section Text Containers    -->
                    <div class="tab-content">
                        <div id="gradDifferential" class="tab-pane fade in active show">
                            <h3 class="section-sub-head first-sub-head">
                                Gradient Operator: <span class="mathJaxHeading">$ \nabla \Omega $</span>
                            </h3>
                            Grad operates on a scalar field <span class="mathJaxInline">$ f(x, y) $</span> to produce a
                            vector field indicating the magnitude and direction of the
                            steepest gradient at each point.
                            <br><br>
                            It is easy to remember that grad produces a vector field, because it is necessary
                            for the gradient to have a direction once there is more than one dimension involved. It must
                            act on a scalar field
                            because it doesn't make much sense for a vector field to have a gradient.
                            <br><br>
                            <h3 class="section-sub-head">
                                Visualisation Guide
                            </h3>
                            The surface shown on the right is a scalar function <span class="mathJaxInline">$ f $</span>
                            of two independent variables, <span class="mathJaxInline">$ x $</span> and <span
                                class="mathJaxInline">$ y. $</span> Note that it is a 2D scalar field &mdash;
                            the third dimension is just being used to display the value of the function.
                            <br><br>
                            Beneath it the gradient of the function <span class="mathJaxInline">$ \nabla f $</span> is
                            shown. By changing the coefficient <span class="mathJaxInline">$ a, $</span> the gradient of
                            the function can be increased
                            and decreased in certain directions. There are also several functions to choose from.
                            <br><br>
                            The idea extends to three dimensions in the same way. For example, if you were to plot the
                            magnitude of the Sun's gravitational field
                            in 3D space around the Sun, the gradient of this field would give vectors that point to the
                            centre of the Sun at every point.
                        </div>
                        <div id="gradIntegral" class="tab-pane fade">
                            <span class="mathJaxDisplay">
                                $$ \Omega_B - \Omega_A = \int _A ^B \nabla \Omega \cdot d\mathbf{l} $$
                            </span>
                            For a given vector field, if <span
                                class="mathJaxInline">$ \mathbf{A} \cdot d\mathbf{l} $</span> is an exact differential,
                            <span class="mathJaxInline">$ \mathbf{A} $</span> is a conservative field. Then, <span
                                class="mathJaxInline">$ \mathbf{A} $</span> is the
                            gradient function of some scalar function <span class="mathJaxInline">$ \Omega. $</span>
                            That is, <span class="mathJaxInline">$ \mathbf{A} = \nabla {\Omega}. $</span>
                            <br><br>
                            We can relate <span class="mathJaxInline">$ \Omega $</span> and <span class="mathJaxInline">$ \nabla \Omega $</span>
                            by the equation below:
                            <span class="mathJaxDisplay">
                                $$ \int _A ^B \nabla \Omega \cdot d\mathbf{l} = \Omega_B - \Omega_A $$
                            </span>
                            From this equation above, we can see that the integral is independent of the path that one
                            takes from A to B,
                            for it is determined by only the values from the parent function <span
                                class="mathJaxInline">$ \Omega_B - \Omega_A. $</span> This is a generalisation of the
                            Fundamental Theorem of Calculus.
                            <br><br>
                            <h3 class="section-sub-head">
                                Visualisation Guide
                            </h3>
                            <ol>
                                <li>
                                    <p>
                                        On the right, you can see a gradient field and its scalar parent function.
                                        Change the value of the parameter <span class="mathJaxInline">$ a, $</span> and
                                        observe the change in <span class="mathJaxInline">$ \nabla \Omega $</span> and
                                        <span class="mathJaxInline">$ \Omega. $</span>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Note that as the magnitude of <span class="mathJaxInline">$ a $</span>
                                        increases,
                                        the length of the arrows in <span class="mathJaxInline">$ \nabla \Omega $</span>
                                        increases and the contour of the parent function
                                        <span class="mathJaxInline">$ \Omega $</span> becomes steeper as well. Hence,
                                        the gradient vector increases in magnitude as well.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        All gradient fields shown in this suite are conservative. This means that the
                                        line
                                        integral along the field,
                                        <span class="mathJaxInline">$ \int \nabla \Omega \cdot d\mathbf{l} $</span> is
                                        path
                                        independent. Move the path of the ball from Point A to Point B
                                        along 2 different paths, Path 1 and Path 2.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Observe their function values. Note that along the path, the value of <span
                                            class="mathJaxInline">$ \Omega $</span> may be different.
                                        However, when the balls reach Point B, their function values are equal.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        This means that the line integral <span class="mathJaxInline">$ \int _A ^B \nabla \Omega \cdot d\mathbf{l} $</span>
                                        is determined
                                        only by the value of <span class="mathJaxInline">$ \Omega $</span> at the
                                        limits,
                                        <span class="mathJaxInline">$ \Omega_B - \Omega_A. $</span>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        There are a few other functions for you to play around with. Click the dropdown
                                        menu
                                        to find out.
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-container" id="sc3">
                <div class="placeholder" id="ph3">
                    <hr>
                    <h2 class="text section-head" id="s3">
                        {{sectionTitleLong[2]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p3">
                    <!--    Sub-Section Tabs    -->
                    <ul class="nav nav-tabs nav-justified">
                        <li :class="[subSection[2] === 1 ? 'shaded' : '', 'active', 'tabLeft']">
                            <a data-toggle="tab" href="#divergenceDifferential"
                               @click="subScrollTo(3); subSection[2]=1; $forceUpdate();">Differential</a>
                        </li>
                        <li :class="[subSection[2] === 2 ? 'shaded' : '', 'tabRight']">
                            <a data-toggle="tab" href="#divergenceIntegral"
                               @click="subScrollTo(3); subSection[2]=2; $forceUpdate();">Integral</a>
                        </li>
                    </ul>
                    <!--    Sub-Section Text Containers    -->
                    <div class="tab-content">
                        <div id="divergenceDifferential" class="tab-pane fade in active show">
                            <h3 class="section-sub-head first-sub-head">
                                Divergence Operator: <span class="mathJaxHeading">$ \nabla \cdot \mathbf{f} $</span>
                            </h3>
                            Divergence is a vector operator that describes the quantity of a vector field at each point.
                            It is the volume density of outward flux of a vector field at an infinitesimal volume around
                            a point.
                            This leads to another way of understanding divergence:
                            <br><br>
                            Imagine a point <span class="mathJaxInline">$ (x_A,y_A) $</span> in the vector field, which
                            has a vector output assigned to it.
                            If <span class="mathJaxInline">$ \nabla \cdot \mathbf{f}(x_A,y_A) \neq 0, $</span> as we
                            move along an
                            infinitesimal distance parallel to the direction of the vector at the point (that is <span
                                class="mathJaxInline">$ \mathbf{f}(x_A,y_A)), $</span>
                            there is a change in the magnitude of the output vector, which is the field strength. If
                            divergence is positive, the field strength
                            increases as we move in the direction of the vector at <span class="mathJaxInline">$ (x_A,y_A). $</span>
                            If divergence is negative, the field strength
                            decreases as we move in the direction of the vector at the point.
                            <br><br>
                            <h3 class="section-sub-head">
                                Visualisation Guide
                            </h3>
                            <ol>
                                <li>
                                    <p>
                                        A vector field is shown on the right. This field has a constant divergence value
                                        as indicated.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Note that the field does not look like a "source" or "sink".
                                        However, the field strength still changes along the x-direction, which indicates
                                        a non-zero divergence.
                                        As you move along a direction parallel to the vector field at any point,
                                        there is a change in the magnitude of the vector field. We can imagine this as
                                        if field lines are created or destroyed as we move along.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Adjust the slider until the value of divergence is zero.
                                        Note that the length of the arrows in the field are constant; there is no
                                        creation or destruction of field lines.
                                        Hence, this is a divergence-free field.
                                    </p>
                                </li>
                            </ol>
                        </div>
                        <div id="divergenceIntegral" class="tab-pane fade">
                            <h3 class="section-sub-head first-sub-head">
                                Flux - the flow of field lines
                            </h3>
                            We often call <span class="mathJaxInline">$ \mathbf{F} \cdot d\mathbf{S} $</span> the flux
                            of field <span class="mathJaxInline">$ \mathbf{F} $</span> perpendicular through a surface
                            element <span class="mathJaxInline">$ d\mathbf{S}. $</span>
                            <br><br>
                            The <b>net</b> flux through any surface <span class="mathJaxInline">$ \mathbf{S} $</span> is
                            given by the integral:
                            <span class="mathJaxDisplay">
                                $$ \iint_S \mathbf{F} \cdot d\mathbf{S} $$
                            </span>
                            By considering a <b>closed</b> surface, the Divergence Theorem relates the net flux to the
                            divergence of the field:
                            <span class="mathJaxDisplay">
                                $$ {\large\bigcirc}\kern-1.55em\iint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_V \nabla \cdot \mathbf{F} dV $$
                            </span>
                            <!-- BROKEN LINK -->
                            An <a> <!--href="Visualisations/Static-Electromagnetism/EM_p1.html"-->example</a> of the
                            Divergence
                            Theorem is Maxwell's Equation.
                            <h3 class="section-sub-head">
                                Visualisation Guide
                            </h3>
                            In this visualisation, the green line can be thought as taking the side view of the surface
                            element. You may move it by dragging it and rotate it by moving the slider.
                            <br><br>
                            There are two vectors shown: the black one is the normal of the surface element while the
                            grey one is the
                            field strength at the point.
                            <br><br>
                            Note: The flux counter on top right is a scaled flux.
                            <br><br>
                            <b>Important:</b> We are using field lines representation here, not vector field.
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-container" id="sc4">
                <div class="placeholder" id="ph4">
                    <hr>
                    <h2 class="text section-head" id="s4">
                        {{sectionTitleLong[3]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p4">
                    <!--    Sub-Section Tabs    -->
                    <ul class="nav nav-tabs nav-justified">
                        <li :class="[subSection[3] === 1 ? 'shaded' : '', 'active', 'tabLeft']">
                            <a data-toggle="tab" href="#curlDifferential"
                               @click="subScrollTo(4); subSection[3]=1; $forceUpdate();">Differential</a>
                        </li>
                        <li :class="[subSection[3] === 2 ? 'shaded' : '', 'tabRight']">
                            <a data-toggle="tab" href="#curlIntegral"
                               @click="subScrollTo(4); subSection[3]=2; $forceUpdate();">Integral</a>
                        </li>
                    </ul>
                    <!--    Sub-Section Text Containers    -->
                    <div class="tab-content">
                        <div id="curlDifferential" class="tab-pane fade in active show">
                            <h3 class="section-sub-head first-sub-head">
                                The Curl Operator: <span class="mathJaxHeading">$ \nabla \times \mathbf{f} $</span>
                            </h3>
                            Curl is a vector operator that describes the infinitesimal rotation of a vector field.
                            It can be seen as the tendency of rotation at a point in the vector field.
                            Curl exists in circulation field such as a vortex.
                            <br><br>
                            However, curl can still manifest in a non "circulation-looking" vector field like the one on
                            the right.
                            Consider a microscopic point placed in the vector field; if the field strength acting on the
                            point varies
                            at different parts of the point, it creates a tendency for the point to rotate.
                            <br><br>
                            This leads to another way of understanding curl:
                            <br><br>
                            Imagine travelling over an infinitesimal distance in the direction perpendicular to the
                            vector field at a point.
                            If the field strength changes along this infinitesimal distance travelled, there is a
                            non-zero curl at the point.
                            <br><br>
                            <h3 class="section-sub-head">
                                Visualisation Guide
                            </h3>
                            <ol>
                                <li>
                                    <p>
                                        A vector field is shown on the right. This field has a curl value as
                                        indicated.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Note that the field does not look like a "circulation".
                                        However, as you move along a direction perpendicular to the vector field at any
                                        point,
                                        there is a change in the magnitude of the vector field. this gives a paddle the
                                        tendency to rotate in such a field.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Adjust the slider until the value of curl is zero.
                                        Note that the length of the arrows in the field are constant; there is no
                                        rotational
                                        tendency, only translation.
                                        Hence, this is a curl-free field.
                                    </p>
                                </li>
                            </ol>
                        </div>
                        <div id="curlIntegral" class="tab-pane fade">
                            Stokes' Theorem states:
                            <span class="mathJaxDisplay">
                                $$ \oint_{l} \mathbf {B} \cdot d\mathbf{l} = \iint_{S} \nabla \times \mathbf {B} \cdot d\mathbf{S} $$
                            </span>
                            i.e. the closed loop integral of a vector field is equal to the sum of all the curl
                            contained in the surface
                            enclosed by the loop.
                            <br><br>
                            This is demonstrated in the visualisation on the right, where the components of
                            <span class="mathJaxInline">$ \mathbf {B} \cdot d\mathbf{l} $</span> as you go around the
                            loop are shown in the plot at the bottom. The contributions are positive if
                            the field and dl are pointing in the same direction.
                            <br><br>
                            <h3 class="section-sub-head">
                                Visualisation Guide
                            </h3>
                            When there is curl inside the loop then the overall loop integral is non-zero,
                            since on all parts of the loop, the contributions to the integral from the curl source have
                            the same sign; however
                            when the curl source is outside of the loop, then the contributions cancel out and the net
                            integral is zero.
                            <br><br>
                            This also demonstrates that the curl of a conservative field is zero, since any loop
                            integral
                            in a conservative field is also zero.
                            <br><br>
                            You can change the shape of the loop to see that this is true for any type of closed loop.
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-container" id="sc5">
                <div class="placeholder" id="ph5">
                    <hr>
                    <h2 class="text section-head" id="s5">
                        {{sectionTitleLong[4]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p5">
                    In vector calculus, there are three important operations that are related to <span
                        class="mathJaxInline">$ \nabla, $</span> the vector differential operator.
                    <br><br>
                    The three operations are gradient <span class="mathJaxInline">$ \nabla, $</span> divergence <span
                        class="mathJaxInline">$ \nabla \cdot $</span> and curl <span class="mathJaxInline">$ \nabla \times. $</span>
                    With these operations, we can specify any scalar field or vector field if given enough initial
                    conditions.
                    <br><br>
                    To specify a scalar field, we need the value at a point and gradient of the entire space.
                    To specify a vector field, we need the value at a point along with the divergence and curl of the
                    entire space.
                    <br><br>
                    There are two theorems that connect these differential operations to integration.
                    They are the Divergence Theorem:
                    <span class="mathJaxDisplay">
                        $$ {\large\bigcirc}\kern-1.55em\iint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_V \nabla \cdot \mathbf{F} dV $$
                    </span>
                    and Stoke's Theorem:
                    <span class="mathJaxDisplay">
                        $$ \oint_{l} \mathbf{A.dl} = \displaystyle \iint_{S} \nabla \times \mathbf {A} \cdot d\mathbf{S} $$
                    </span>
                    Vector calculus is used extensively in electromagnetic fields, gravitational fields and fluid flow.
                    You may like to visit our electromagnetism visualisation suite on Maxwell's equations.
                    On top of that, there are two interesting applications of the Divergence and Stokes' Theorem where
                    you can explore.
                </div>
            </div>
        </div>
    </div>
    <!--    Right Side of Window - containing mainly interactive and visual content    -->
    <div class="vis-container right" id="right-container">
        <!--    Title Banner above Right Side    -->
        <div class="banner">
            <!--    Visualisation Title    -->
            <h1 class="" id="vis-title">
                VECTOR CALCULUS CONCEPTS
            </h1>
        </div>
        <!--    Space into which visualisations are loaded    -->
        <div id="rightloadSpace">
            <!--    fade transition tag for RHS - applied by Vue and CSS    -->
            <transition-group name="fade" tag="div" class="transition-container">
                <!--    Interactive Zone Containers   -->
                <div class="rightload text odd" id='loadout1Container' key="loadout1Container"
                     v-if="currentSection === 1">
                    <iframe src="right-0Intro.html" class="rightload text" id="iframe1"></iframe>
                </div>
                <div class="rightload text even" id='loadout2Container' key="loadout2Container"
                     v-if="currentSection === 2">
                    <transition name="fade">
                        <!--Interactive Zone Sub Containers-->
                        <div class="rightload text" id='loadout2sub1Container' key="loadout2sub1Container"
                             v-if="subSection[1] === 1">
                            <iframe src="right-1aGrad.html" class="rightload text" id="iframe2-1"></iframe>
                        </div>
                        <div class="rightload text" id='loadout2sub2Container' key="loadout2sub2Container" v-else>
                            <iframe src="right-1bGrad.html" class="rightload text" id="iframe2-2"></iframe>
                        </div>
                    </transition>
                </div>
                <div class="rightload text odd" id='loadout3Container' key="loadout3Container"
                     v-if="currentSection === 3">
                    <transition name="fade">
                        <!--Interactive Zone Sub Containers-->
                        <div class="rightload text" id='loadout3sub1Container' key="loadout3sub1Container"
                             v-if="subSection[2] === 1">
                            <iframe src="right-2aDiv.html" class="rightload text" id="iframe3-1"></iframe>
                        </div>
                        <div class="rightload text" id='loadout3sub2Container' key="loadout3sub2Container" v-else>
                            <iframe src="right-2bDiv.html" class="rightload text" id="iframe3-2"></iframe>
                        </div>
                    </transition>
                </div>
                <div class="rightload text even" id='loadout4Container' key="loadout4Container"
                     v-if="currentSection === 4">
                    <transition name="fade">
                        <!--Interactive Zone Sub Containers-->
                        <div class="rightload text" id='loadout4sub1Container' key="loadout4sub1Container"
                             v-if="subSection[3] === 1">
                            <iframe src="right-3aCurl.html" class="rightload text" id="iframe4-1"></iframe>
                        </div>
                        <div class="rightload text" id='loadout4sub2Container' key="loadout4sub2Container" v-else>
                            <iframe src="right-3bCurl.html" class="rightload text" id="iframe4-2"></iframe>
                        </div>
                    </transition>
                </div>
                <div class="rightload text odd" id='loadout5Container' key="loadout5Container"
                     v-if="currentSection === 5">
                    <iframe src="right-4Outro.html" class="rightload text" id="iframe5"></iframe>
                </div>
            </transition-group>
        </div>
    </div>
  </div>
</template>

<script>
var debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        if (immediate && !timeout) func.apply(context, args);
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export default {
  name: 'app',
  components: {
  
  },
  data(){return {
        // Data required including variables associated with visible sections, script paths and booleans reflecting state of vis
        scrollPos: 0,
        currentTitle: 0,
        currentSection: 0,
        sectionTops: [],
        sectionBottoms: [],
        sectionTitleLong: ["Introduction", "Gradient", "Divergence", "Curl", "Conclusion"],
        sectionTitleShort: ["1", "2", "3", "4", "5"],
        sectionTitle: [],
        hoverPos: '',
        hoverTitle: false,
        mouseX: '',
        n: "",
        journeyHeightOld: "",
        journeyHeightNew: "",
        firstRunDone: false,
        subSection: [false, 1, 1, 1],
        showJourney: true,
    }},

    methods: {

        // Function called on scrolling of of left panel to indicate distance scrolled down journey content div
        scrollFunc: function () {
            // function only works once sectionPos has run at least once (in mounted)
            if (this.firstRunDone === true) {
                this.scrollPos = document.querySelectorAll(".journey")[0].scrollTop;
                this.changeTitle();
                this.changeSec();
            }
        },

        handleElement: function (section) {
            // update currentSection variable if user scrolls past the top edge of its corresponding section on left side
            if (this.scrollPos >= this.sectionTops[section - 1] && this.scrollPos < this.sectionBottoms[section - 1]) {
                this.currentTitle = section;
            }
        },

        changeTitle: function () {
            for (let i = 1; i <= this.n; i++) {
                this.handleElement(i)
            }
        },

        changeSec: debounce(function () {
            this.currentSection = this.currentTitle;
        }, 200),

        swapTitles: function (newValue, oldValue) {
            for (let i = 1; i <= this.n; i++) {
                if (i !== newValue) {
                    this.sectionTitle[i - 1] = this.sectionTitleShort[i - 1];
                } else {
                    setTimeout(function () {
                        this.sectionTitle[i - 1] = this.sectionTitleLong[i - 1];
                    }.bind(this), 20);
                    setTimeout(function () {
                        this.$forceUpdate();
                    }.bind(this), 100);
                }
            }
        },

        // Function called every x seconds to check if section div sizes have changed and recalculate scroll positions if so
        // Div sizes may change if window re-sized or if a subsection is expanded/collapsed
        sectionPos: function () {
            this.$nextTick(function () {
                let overallTop = document.querySelectorAll("#sc1")[0].offsetTop;
                for (let i = 1; i <= this.n; i++) {
                    if (i < this.n) {
                        this.sectionTops[i - 1] = (document.querySelectorAll("#" + "sc" + i)[0].offsetTop - overallTop);
                        this.sectionBottoms[i - 1] = (this.sectionTops[i - 1] + document.querySelectorAll("#" + "sc" + i)[0].offsetHeight);
                    } else {
                        this.sectionTops[i - 1] = (document.querySelectorAll("#" + "sc" + i)[0].offsetTop - overallTop);
                        this.sectionBottoms[i - 1] = (this.sectionTops[i - 1] + document.querySelectorAll("#" + "sc" + i)[0].offsetHeight - document.querySelectorAll(".journey")[0].offsetHeight);
                    }
                }
                this.firstRunDone = true;
                this.scrollFunc();
            })
        },

        // Function activated when button in nav/progress bar clicked to scroll automatically to relevant section
        scrollTo: function (event) {
            document.querySelectorAll("#" + "ph" + event.currentTarget.dataset.no + " " + "hr")[0].scrollIntoView({behavior: "smooth"});
        },

        // Same as above but for subsections
        subScrollTo: function (section) {
            if (this.currentSection !== section) {
                let scrollTarget = document.querySelectorAll("#ph" + section)[0];
                scrollTarget.scrollIntoView({behavior: "smooth"});
            }
        },

        // Updates number of title being hovered over in nav/progress bar in data
        hoverPosUpdate: function (event) {
            this.hoverPos = parseFloat(event.currentTarget.dataset.no)
        },

        // Updates if and what title show when hovering over nav/progress bar
        selectHover: function () {
            if (this.currentTitle !== this.hoverPos) {
                this.hoverTitle = this.sectionTitleLong[this.hoverPos - 1]
            } else {
                this.hoverTitle = false
            }
        },

        // Updates x-position of mouse in data
        updateMouseX: function (event) {
            // pass event object, bound to mouse move with update
            this.mouseX = event.clientX - 15;
        },

        // Toggles button text from 'hide' to 'show' depending on state
        hideShowToggle: function (event) {
            let toggleTarget = event.currentTarget.querySelectorAll('span')[0].innerHTML;
            if (toggleTarget === "Show") {
                event.currentTarget.querySelectorAll('span')[0].innerHTML = "Hide"
            } else {
                event.currentTarget.querySelectorAll('span')[0].innerHTML = "Show"
            }
        },

        // toggles visibility of journey section
        toggleJourney: function () {
            let sectionCache = this.currentSection;
            document.querySelectorAll("#rightloadSpace")[0].classList.add("rightLoadInterim");
            this.showJourney = !this.showJourney;
            setTimeout(function () {
                if (this.showJourney === false) {
                    document.querySelectorAll("#rightloadSpace")[0].classList.add("fullRightLoadSpace");
                } else {
                    document.querySelectorAll("#rightloadSpace")[0].classList.remove("fullRightLoadSpace");
                }
                this.currentSection = "noShow";
            }.bind(this), 500);
            setTimeout(function () {
                this.currentSection = sectionCache;
                document.querySelectorAll("#rightloadSpace")[0].classList.remove("rightLoadInterim");
            }.bind(this), 525);
        },
    },

    watch: {

        // Updates current section title to display in full in nav/progress bar whilst minimising other section titles
        currentTitle: function (newValue, oldValue) {
            this.swapTitles(newValue, oldValue)
        },
    },

    mounted() {

        // $nextTick ensures initial functions only run once Vue is initialised sufficiently
        this.$nextTick(function () {
                // makes n equal to total number of sections
                this.n = document.querySelectorAll(".section-container").length;
                // calculates initial div section positions in journey with respect to the top
                this.sectionPos();
                // checks if journey div height changes every x seconds
                // if it does change, re-runs sectionPos to calculate section div positions
                this.journeyHeightOld = document.querySelectorAll(".journey")[0].scrollHeight;
                window.setInterval(function() {
                    this.journeyHeightNew = document.querySelectorAll(".journey")[0].scrollHeight;
                    if (this.journeyHeightOld !== this.journeyHeightNew) {
                        this.journeyHeightOld = this.journeyHeightNew;
                        this.sectionPos();
                    }
                }.bind(this), 2000);
            }
        )
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
