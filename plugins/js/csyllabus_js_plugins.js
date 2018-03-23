keywords = [];

function ssc() {
    var similarCoursesContainer = document.getElementById("csyllabus-similar-courses-plugin");
    var e = similarCoursesContainer.getAttribute("data-courseId");
    similarCoursesContainer.innerHTML = '<div id="txtHint">Loading similar courses...</div><table id="result-table"> <thead> <tr> <th>Name</th> <th>University</th> <th>Similarity result</th> </tr></thead> <tbody id="similarCourses"> <tr> </tr></tbody> </table>';
    var t = new XMLHttpRequest;
    t.onreadystatechange = function () {
        if (4 === this.readyState && 200 === this.status) {
            document.getElementById("txtHint").outerHTML = "", document.getElementById("result-table").style.display = "table", document.getElementById("similarCourses").innerHTML = "";
            var e = JSON.parse(this.responseText).data.items;
            e.shift(), e.forEach(function (e) {
                document.getElementById("similarCourses").innerHTML += "<tr><td>" + e.name + "</td><td>" + e.university + "</td><td>" + Math.round(100 * e.result) + "</td></tr>"
            })
        }
    }, t.open("GET", "https://api.csyllabus.com/api/comparator?course=" + e, !0), t.setRequestHeader("Accept", "application/json"), t.send()
}

function scr() {
    var container = document.getElementById("csyllabus-institution-comparator-plugin");
    var e = container.getAttribute("data-universityId");
    var t = {course_description: document.getElementById("description-input").value}, n = new XMLHttpRequest;
    document.getElementById("similarCourses").innerHTML = "";
    n.onreadystatechange = function () {
        if (4 === this.readyState && 200 === this.status) {
            document.getElementById("result-table").style.display = "table";
            var e = JSON.parse(this.responseText).data.items;
            e.shift(), e.forEach(function (e) {
                document.getElementById("similarCourses").innerHTML += "<tr><td>" + e.name + "</td><td>" + e.university + "</td><td>" + Math.round(100 * e.result) + "</td></tr>"
            })
        }
    }, n.open("POST", "https://api.csyllabus.com/api/comparator_text_input?university_id=" + e, !0), n.setRequestHeader("Accept", "application/json"), n.setRequestHeader("Content-Type", "application/json"), n.send(JSON.stringify(t))
}

function scrp() {
    var container = document.getElementById("csyllabus-institution-comparator-plugin");
    container.innerHTML = '<div class="top blue-top"></div><div class="content"> <div class="wrap"> <div class="form-input"> <label> <textarea id="description-input"></textarea> </label> <div style="text-align: center;"> <button onclick="scr()" class="button blue">Compare</button> </div></div><table id="result-table"> <thead> <tr> <th>Name</th> <th>University</th> <th>Comparison result</th> </tr></thead> <tbody id="similarCourses"> <tr> </tr></tbody> </table> </div></div>';
}

function serp() {
    var container = document.getElementById("csyllabus-institution-explorer-plugin");
    container.innerHTML = '<div class="top blue-top"></div><div class="content"> <div class="wrap"> <div class="form-input"> <label> <input required id="keyword-input" onkeyup="addKeyword(event)"> <span class="placeholder">Add keywords</span> </label> <div id="keywords"></div><div style="text-align: center;"> <button onclick="ser()" class="button blue">Explore</button></div></div><table id="result-table"> <thead> <tr> <th>Name</th> <th>University</th> <th>Similarity result</th> </tr></thead> <tbody id="similarCourses"> <tr> </tr></tbody> </table> </div></div>';
}

function ser() {
    var container = document.getElementById("csyllabus-institution-explorer-plugin");
    var e = container.getAttribute("data-universityId");
    document.getElementById("similarCourses").innerHTML = "";
    var n = document.getElementById("keyword-input").value;
    if (n.length > 0) {
        document.getElementById("keyword-input").value = "";
        var s = keywords.push(n);
        document.getElementById("keywords").innerHTML += '<div class="chip" id="chip-' + s + '">' + n + '<button onclick="removeKeyword(' + s + ')">x</button></div>'
    }
    var i = new XMLHttpRequest;
    i.onreadystatechange = function () {
        if (4 === this.readyState && 200 === this.status) {
            document.getElementById("result-table").style.display = "table";
            var e = JSON.parse(this.responseText).data.items;
            e.shift(), e.forEach(function (e) {
                document.getElementById("similarCourses").innerHTML += "<tr><td>" + e.name + "</td><td>" + e.university + "</td><td>" + Math.round(100 * e.rank) + "</td></tr>"
            })
        }
    }, i.open("GET", "https://api.csyllabus.com/api/explorer?university_id=" + e + "&keywords=" + keywords.join("-"), !0), i.setRequestHeader("Accept", "application/json"), i.send()
}

function addKeyword(e) {
    if (13 === e.keyCode) {
        var t = document.getElementById("keyword-input").value;
        document.getElementById("keyword-input").value = "";
        var n = keywords.push(t);
        document.getElementById("keywords").innerHTML += '<div class="chip" id="chip-' + n + '">' + t + '<button onclick="removeKeyword(' + n + ')">x</button></div>'
    }
}

function removeKeyword(e) {
    document.getElementById("chip-" + e).outerHTML = "", delete keywords[e]
}