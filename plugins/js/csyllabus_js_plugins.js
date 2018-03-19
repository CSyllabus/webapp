function showSimilarCourses(courseId) {
    var t = new XMLHttpRequest;
    t.onreadystatechange = function () {
        if (4 === this.readyState && 200 === this.status) {
            document.getElementById("txtHint").outerHTML = "", document.getElementById("result-table").style.display = "table";
            document.getElementById("similarCourses").innerHTML = "";
            var t = JSON.parse(this.responseText).data.items;
            t.shift(), t.forEach(function (t) {
                document.getElementById("similarCourses").innerHTML += "<tr><td>" + t.name + "</td><td>" + t.university + "</td><td>" + Math.round(100 * t.result) + "</td></tr>"
            })
        }
    }, t.open("GET", "http://localhost:8000/api/comparator?course=" + courseId, !0), t.setRequestHeader("Accept", "application/json"), t.send()
}

function showComparatorResultsByUniversityId(universityId) {
    var data = {'course_description': document.getElementById('description-input').value};


    var t = new XMLHttpRequest;
    t.onreadystatechange = function () {
        if (4 === this.readyState && 200 === this.status) {
            document.getElementById("result-table").style.display = "table";
            document.getElementById("similarCourses").innerHTML = "";
            var t = JSON.parse(this.responseText).data.items;
            t.shift(), t.forEach(function (t) {
                document.getElementById("similarCourses").innerHTML += "<tr><td>" + t.name + "</td><td>" + t.university + "</td><td>" + Math.round(100 * t.result) + "</td></tr>"
            })
        }
    }, t.open("POST", "http://localhost:8000/api/comparator_text_input?university_id=" + universityId, !0), t.setRequestHeader("Accept", "application/json"), t.setRequestHeader("Content-Type", "application/json"), t.send(JSON.stringify(data))
}


function showExplorerResultsByUniversityId(universityId, keywords) {
    var keyword = document.getElementById('keyword-input').value;
    if (keyword.length > 0) {
       document.getElementById('keyword-input').value = "";
    var i = keywords.push(keyword);
    document.getElementById('keywords').innerHTML += '<div class="chip" id="chip-' + i +
        '">' + keyword + '<button onclick="removeKeyword(' + i + ')">x</button></div>';
    }


    var t = new XMLHttpRequest;
    t.onreadystatechange = function () {
        if (4 === this.readyState && 200 === this.status) {
            document.getElementById("result-table").style.display = "table";
            document.getElementById("similarCourses").innerHTML = "";
            var t = JSON.parse(this.responseText).data.items;
            t.shift(), t.forEach(function (t) {
                document.getElementById("similarCourses").innerHTML += "<tr><td>" + t.name + "</td><td>" + t.university + "</td><td>" + Math.round(100 * t.rank) + "</td></tr>"
            })
        }
    }, t.open("GET", "http://localhost:8000/api/explorer?university_id=" + universityId
        + "&keywords=" + keywords.join('-'), !0), t.setRequestHeader("Accept", "application/json"), t.send()
}

function addKeyword(event) {
    if (event.keyCode === 13) {
        var keyword = document.getElementById('keyword-input').value;
        document.getElementById('keyword-input').value = "";
        var i = keywords.push(keyword);
        document.getElementById('keywords').innerHTML += '<div class="chip" id="chip-' + i +
            '">' + keyword + '<button onclick="removeKeyword(' + i + ')">x</button></div>';
    }
}

function removeKeyword(i) {
    document.getElementById("chip-" + i).outerHTML = "";
    delete keywords[i];
}