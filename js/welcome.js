var welcome = {};

var studyName = 'Learning and Choice';

// --------------  things that vary from task to task --------------

welcome.task = {};
welcome.task.blurb = '<b>"'+studyName+'"</b> is a short psychological study investigating how people make decisions.';
welcome.task.time = '25-30 minutes';
welcome.task.pay = 'US$3';
welcome.task.bonus = 'US$2';

// --------------  things that vary between ethics approvals --------------

welcome.ethics = {};
welcome.ethics.approval = '201808798';
welcome.ethics.name = studyName;
welcome.ethics.selection = 'You are invited to participate in a study of how people learn from feedback.  We hope to learn how people are able to use feedback to improve their accuracy when making decisions about which category a line belongs to. You were selected as a possible participant in this study because you accepted our HIT on Amazon Mechanical Turk.';
welcome.ethics.description = 'If you decide to participate, you will be asked to complete a categorization task. On each trial of the experiment, you will be asked to decide which of two categories a line belongs to, and you will receive feedback on whether your decisions were correct or incorrect. Detailed instructions will be provided once the task begins. There will be a large number of these category decisions to make in the experiment, and the task should take approximately ' + welcome.task.time + ' to complete including reading time.';


// ----------------------- function to start the task ------------------
welcome.run = function() {
    document.getElementById("welcome").innerHTML =
		welcome.section.consent +
        //welcome.section.header +
        welcome.section.start +
        welcome.section.demographics;
}

// ------------- actions to take at the end of each click ----------------
welcome.click = {};
welcome.click.consent = function() {
    welcome.helpers.setDisplay('consent', 'none');
    welcome.helpers.setDisplay('start', '');
    
}
welcome.click.start = function() {
    welcome.helpers.setDisplay('start', 'none');
    welcome.helpers.setDisplay('demographics', '');
    
}
welcome.click.demographics = function() {
    welcome.helpers.setDisplay('demographics', 'none');
    welcome.helpers.setDisplay('header', 'none');
    jsPsych.data.addProperties({  // record the condition assignment in the jsPsych data
        gender: welcome.helpers.getRadioButton("gender"),
        age: document.getElementById("age").value,
        language: document.getElementById("language").value
    });
    startExperiment(); // start the jsPsych experiment
}


// ------------- html for the various sections ----------------
welcome.section = {};
welcome.section.header =
    '<!-- ####################### Heading ####################### -->' +
    '<a name="top"></a>' +
    '<h1 style="text-align:center; width:1200px" id="header" class="header">' +
    '   &nbsp; UIOWA Comparative Cognition Lab</h1>';

welcome.section.consent =
    '	<!-- ####################### Consent ####################### -->' +
    '	<div class="consent" style="width:1000px">' +
    '		<!-- Text box for the splash page -->' +
    '		<div class="consent" style="text-align:left; border:0px solid; padding:10px;  width:800px; font-size:90%; float:right">' +
    '			<p align="right">IRB No ' + welcome.ethics.approval + '</p>' +
    '			<p align="center"><b>THE UNIVERSITY OF IOWA' +
    '			</b><br><br><b>' + welcome.ethics.name + '</b></p>\
	<p>We invite you to participate in a research study.  The purpose of the study is to see how people learn to choose. Approximately 200 participants will take part in this study.</p>\
	<p>If you agree to participate, we would like you to complete a task on the computer. During the task, you will be presented with different pictures. For each image, you will have to choose one of two possible options (also images). You need to pay attention to the characteristics of the images to learn what response button is correct every time. At the beginning, you will not know, but you will be provided visual feedback (the words CORRECT or ERROR); this feedback will guide you in the learning process. Once the computer task finishes, you will be given a debriefing summary.</p>\
	<p>We will keep the information you provide confidential, however federal regulatory agencies and the University of Iowa Institutional Review Board (a committee that reviews and approves research studies) may inspect and copy records pertaining to this research. To help protect your confidentiality, we will be using a random identifier (e.g., "3c") to identify your computer responses. All records will be maintained in locked offices or in password protected files on a secure computer system.  If we write a report about this study, we will do so in such a way that you cannot be identified.</p>\
	<p>The risk of participating in this study is minimal, no more than what you may experience interacting with a computer in your daily life. </p>\
	<p>You will receive a total of ' + welcome.task.pay + ' for your participation in our study. Upon completion of the study, you will receive a code, and you will have to input that code in the Amazon Mechanical Turk page to receive your payment. Additionally, you will receive a bonus payment of '+ welcome.task.bonus + ' if you make more correct responses than the average of all participants in this study. If you qualify for this bonus, you will receive it after we finish collecting our data. There are no additional personal benefits from being in this study. However we hope that others may benefit in the future from what we learn as a result of this study.</p>\
	<p>If you agree to take part in this study, your involvement will last for approximately 30 min. If you decide not to be in this study, or if you want to stop participating at any time, you can just close this browser window. You won’t be penalized for this.</p>\
	<p>If you have any questions about the research study itself or have issues with your payment, please contact Victor Navarro (<a href="mailto:victor-navarro@uiowa.edu">victor-navarro@uiowa.edu</a>). If you have questions about the rights of research subjects, please contact the Human Subjects Office, 105 Hardin Library for the Health Sciences, 600 Newton Rd, The University of Iowa, Iowa City, IA  52242-1098, (319) 335-6564, or e-mail <a href="mailto:irb@uiowa.edu">irb@uiowa.edu</a>. To offer input about your experiences as a research subject or to speak to someone other than the research staff, call the Human Subjects Office at the number above.</p>\
	<p>Thank you very much for your consideration.</p>\
	<p>Sincerely,</p>\
	<p>Victor Navarro, M.A.</p>' + 
	'By continuing, you are making a decision whether or not to participate.  Clicking the button below indicates that, having read the information provided on the participant information sheet, you have decided to participate.' +
    '			<br>' +
    '			<p align="center">' +
    '           <input type="button" id="consentButton" class="consent jspsych-btn" value="I agree" onclick="welcome.click.consent()" >' +
    '			</p>' +
    '			<p>To withdraw your consent, simply close the browser tab and return the HIT. Your data will be deleted from our records.</p>\
    </div><br><br></div>';
	
welcome.section.start =
    '<!-- ####################### Start page ####################### -->' +
    '<div class="start" style="display:none; width: 1000px">' +
    '<div class="start" style="text-align:left; border:0px solid; padding:10px;' +
    '                          width:800px; float:right; font-size:90%">' +
    '<p>Thanks for accepting the HIT. ' + welcome.task.blurb + ' It involves the following steps:</p>' +
    '<ol>' +
    '<li>  We ask for demographic information (not connected to your Amazon ID). You are free to skip these questions if you are not willing to share this information.<br></li>' +
    '<li>  We will then then explain how to do the task in detail.<br></li>' +
    '<li>  Next comes the task itself.<br></li>' +
    '<li>  At the end, we will ask you a few questions related to your performance in the task. Then, we will tell you a bit more about what this study is investigating, and <b>we will give you the completion code you need to get paid for the HIT.</b></li>' +
    '</ol>' +
    '<p>The total time taken should be about ' + welcome.task.time + '. Please <u>do not</u> use the "back" ' +
    '   button on your browser or close the window until you reach the end and receive your completion ' +
    '   code. This is very likely to break the experiment and may make it difficult for you to get paid.' +
    '   However, if something does go wrong, please contact us! When you are ready to begin, click on' +
    '   the "start" button below.<br></p>' +
    '<!-- Next button for the splash page -->' +
    '<p align="center"><br> <input type="button" id="splashButton" class="start jspsych-btn" ' +
    'value="START!" onclick="welcome.click.start()"> </p>' +
    '</div>' +
    '</div>';



welcome.section.demographics =
 '	<!-- ####################### Demographics ####################### -->' +
    '	<div class="demographics" style="display:none; align:center; width: 1000px">' +
    '		<div class="demographics" style="text-align:left; border:0px solid; padding:10px;  width:800px; font-size:90%; float:right">' +
    '			<!-- Explanatory text -->' +
    '            <p font-size:110%><b>Demographic information:</b></p>' +
    '			<p>We ask you to provide this information for our records. This information is kept completely separate from'  +
    '                information about your Amazon ID. As long as you finish the experiment you will get ' +
    '                paid no matter what you put here, so please be honest. Remember, you are free to skip these questions if you are not willing to share this information.</p><br>' +
    '			<!-- Gender -->' +
    '           <label for="gender"><b>Gender: &nbsp;</b></label>' +
    '           <input type="radio" name="gender" value="male" /> Male &nbsp; ' +
    '           <input type="radio" name="gender" value="female" /> Female &nbsp;' +
    '           <input type="radio" name="gender" value="other" /> Other<br /><br />' +
    '			<!-- Age -->' +
    '           <label for="age"><b>Age: &nbsp;</b></label><input id="age" name="age" /><br /><br />' +
    '			<!-- Language -->' +
    '           <label for="language"><b>Native Language(s): &nbsp;</b></label>' +
    '            <input id="language" name="language" /><br /><br />' +
    '		<!-- Demographics  button -->' +
    '        <p align="center">' +
    '                <input type="button" class="demographics jspsych-btn"' +
    '                        id="demographicsButton" value="Next >"' +
    '                       onclick="welcome.click.demographics()">' +
    '       </p></div>';



// ----------------------- helper functions ------------------

welcome.helpers = {};
welcome.helpers.getRadioButton = function(name) { // get the value of a radio button
    var i, radios = document.getElementsByName(name);
    for (i = 0; i < radios.length; i = i + 1) {
        if (radios[i].checked) {
            return (radios[i].value);
        }
    }
    return ("NA");
}
welcome.helpers.setDisplay = function(theClass, theValue) { // toggle display status
    var i, classElements = document.getElementsByClassName(theClass);
    for (i = 0; i < classElements.length; i = i + 1) {
        classElements[i].style.display = theValue;
    }
}
welcome.helpers.setHeader = function(theValue) { // alter the header
    document.getElementById("header").innerText = theValue;
}
