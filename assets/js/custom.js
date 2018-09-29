(function ($) {
	var $header = $("header");
	var $navBar = $header.find("nav");
	var $result = $header.find(".results");
	var $finalMarksEle = $("#results").find(".marks");

	var pointsMap = {
		c1: 0,
		c2: 0,
		c3: 0,
		c4: 0,
		c5: 0
	}

	var totalsMap = {
		c1: 0,
		c2: 0,
		c3: 0,
		c4: 0,
		c5: 0
	}

	var finishedStateMap = {
		c1: 0,
		c2: 0,
		c3: 0,
		c4: 0,
		c5: 0
	}

	var isCompleted = false;

	var categoryMap = {
		c1: "Need for Achievement",
		c2: "Need for Autonomy",
		c3: "Creative Tendency",
		c4: "Locus of Control",
		c5: "Calculated Risk Taking"
	}

	var quectionsMap = {
		c1: ["I would not mind routine unchallenging work if the pay and pensionprospects were good.", "I find it difficult to switch off from work completely.", "I likechallenges that stretch my abilities and get bored with things I can do quite easily.", "If I amhaving problems with a task I leave it, forget it and move on to something else.", "I think moreof the present and past than of the future.", "It is more important to do a job well than to try toplease people.", "I get annoyed if people are not on time for meetings.", "I would rather workwith a person I liked who was not good at the job, rather than work with someone I did not likeeven if they were good at the job.", "I would rather work on a task as part of a team rather thantake responsibility for it myself.", "When I am faced with a challenge I think more about theresults of succeeding than the effects of failing.", "I get up early, stay late or skip meals if I havea deadline for some work that needs to be done.", "I find it easy to relax on holiday and forgetabout work."],
		c2: ["I tend not to like to stand out or be unconventional.", "At work, I oftentake over projects and steer them my way without worrying about what other people think.", "Ilike a lot of guidance to be really clear about what to do in work.", "I rarely need or want anyassistance and like to put my own stamp on work that I do.", "I usually do what is expected ofme and follow instructions carefully.", "I get annoyed if superiors or colleagues take credit formy work."],
		c3: ["I rarely day dream.", "Sometimes people find my ideas unusual.", "Sometimes I think about information almost obsessively until I come up with new ideas andsolutions.", "I do not like unexpected changes to my weekly routines.", "I am wary of newideas, gadgets and technologies.", "Other people think that I‘m always making changes andtrying out new ideas.", "I prefer to be quite good at several things rather than very good at onething.", "I prefer doing things in the usual way rather than trying out new methods.", "I like tohave my life organized so that it runs smoothly and to plan.", "I like to spend time with peoplewho have different ways of thinking.", "Sometimes I have so many ideas that I feelpressurized.", "It is harder for me to adapt to change than keep to a routine."],
		c4: ["Capable people who fail to become successful have not usuallytaken chances when they have occurred.", "You are either naturally good at something or you arenot, effort makes no difference.", "Many of the bad times that people experience are due to badluck.", "When I make plans I nearly always achieve them.", "People generally get what theydeserve.", "I try to accept that things happen to me in life for a reason.", "You are not likely tobe successful unless you are in the right place at the right time.", "Being successful is a result ofworking hard, luck has little to do with it.", "For me, getting what I want is a just reward for myefforts.", "I believe that destiny determines what happens to me in life.", "People&#39;s failures arerarely the result of their poor judgment.", "I get what I want from life because I work hard tomake it happen."],
		c5: ["I like to test boundaries and get into areas where few have workedbefore.", "I would rather buy a lottery ticket than enter a competition.", "I would prefer to havea moderate income in a secure job rather than a high income in a job that depended on myperformance.", "If I wanted to achieve something and the chances of success were 50/50 I wouldtake the risk.", "If I had a good idea for making some money, I would be willing to invest mytime and borrow money to enable me to do it.", "If there is a chance of failure I would rather notdo it.", "Before I make a decision I like to have all the facts no matter how long it takes.", "Before making an important decision I prefer to weigh up the pro&#39;s and con&#39;s fairly quicklyrather than spending a long time thinking about it.", "I would rather take an opportunity thatmight lead to even better things than have an experience that I am sure to enjoy.", "I find itdifficult to ask for favors from other people.", "What we are used to is usually better than what isunfamiliar.", "I like to start interesting projects even if there is no guaranteed payback for themoney or time I have to put in."],

	}

	function createQuectionHtml(qNumber, text, category) {
		var radioName = category + '-q-' + qNumber;
		var output = "";
		output += '<div class="field">';
		output += qNumber + '. ' + text;
		output += '</div>';
		output += '<div class="field half">';
		output += '<input type="radio" name="' + radioName + '" value="1" id="' + radioName + 'y' + '">';
		output += '<label for="' + radioName + 'y' + '">Yes</label>';
		output += '</div>';
		output += '<div class="field half">';
		output += '<input type="radio" name="' + radioName + '" value="0" id="' + radioName + 'n' + '">';
		output += '<label for="' + radioName + 'n' + '">No</label>';
		output += '</div>';
		return output;
	}

	function checkeForCompletion() {
		isCompleted = true;
		for (var k in finishedStateMap) {
			if (finishedStateMap[k] === 0) {
				isCompleted = false;
			}
		}
		return isCompleted;
	}

	function getFinalMark() {
		total = 0;
		for (i in pointsMap) {
			total += pointsMap[i];
		}
		return parseInt(total * 100 / 54);
	}

	$.each(quectionsMap, function (category, quectionList) {
		totalsMap[category] = quectionList.length;
		var quectionHolder = $("#" + category).find(".quections");
		$.each(quectionList, function (n, text) {
			quectionHolder.append(createQuectionHtml(n + 1, text, category));
		})
	});

	$(".submit-btn").on("click", function (e) {
		var $button = $(this);
		var currentCategory = $button.attr("data-quection-category");
		var $answers = $button.closest("article").find("input[type=radio]:checked");
		var points = 0;
		var answerCount = $answers.length;
		var quectionCount = totalsMap[currentCategory];
		$answers
			.each(function (ele) {
				points += parseInt($(this).val());
			});
		pointsMap[currentCategory] = points;
		if (answerCount > 0) {
			if (answerCount == quectionCount) {
				$navBar.find("li." + currentCategory + " i").addClass("full");
				finishedStateMap[currentCategory] = 1;
			} else {
				$navBar.find("li." + currentCategory + " i").addClass("half");
			}
		}

		if (checkeForCompletion()) {
			$result.show();
		}
		location.hash = '';
	})

	window.onhashchange = function () {
		var hash = window.location.hash;
		if (hash === "#results" && isCompleted) {
			setTimeout(function () {
				//marks
				var options = {
					useEasing: true,
					useGrouping: true,
					separator: ',',
					decimal: '.',
				};
				var demo = new CountUp($finalMarksEle[0], 0, getFinalMark(), 0, 2.5, options);
				if (!demo.error) {
					demo.start();
				} else {
					console.error(demo.error);
				}

				//barchart1
				var lablesVals = [];
				var seriesVals = [];
				for (i in categoryMap) {
					lablesVals.push(categoryMap[i]);
					seriesVals.push(parseInt(pointsMap[i] / totalsMap[i] * 100))
				}

				new Chartist.Bar('.bar-chart', {
					labels: lablesVals,
					series: seriesVals
				}, {
						distributeSeries: true
					});

			}, 550);
		} else if (hash === "#results" && !isCompleted){
			location.hash = '';
		}
	}

})(jQuery);