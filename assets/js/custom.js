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
		c1: 12,
		c2: 6,
		c3: 12,
		c4: 12,
		c5: 12
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
		en: {
			c1: "Need for Achievement",
			c2: "Need for Autonomy",
			c3: "Creative Tendency",
			c4: "Locus of Control",
			c5: "Calculated Risk Taking"
		},
		si: {
			c1: "අරමුණු සඵල කර ගැනීම",
			c2: "ස්වාධීනත්වය",
			c3: "නිර්මාණශීලිත්වය",
			c4: "ආත්ම විශ්වාසය",
			c5: "අවදානම් භාර ගැනීම"
		}
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

	tippy.setDefaults({
		arrow: true,
		delay: 40,
		theme: 'my-tippy',
		placement: 'bottom'
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
				for (i in pointsMap) {
					lablesVals.push(categoryMap[ecLanguage][i]);
					seriesVals.push(parseInt(pointsMap[i] / totalsMap[i] * 100))
				}

				new Chartist.Bar('.bar-chart', {
					labels: lablesVals,
					series: seriesVals
				}, {
						distributeSeries: true
					});

			}, 550);
		} else if (hash === "#results" && !isCompleted) {
			location.hash = '';
		}
	}

})(jQuery);