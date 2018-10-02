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

	var quectionsMap = {
		en: {
			c1: ["I would not mind routine unchallenging work if the pay and pensionprospects were good.", "I find it difficult to switch off from work completely.", "I likechallenges that stretch my abilities and get bored with things I can do quite easily.", "If I amhaving problems with a task I leave it, forget it and move on to something else.", "I think moreof the present and past than of the future.", "It is more important to do a job well than to try toplease people.", "I get annoyed if people are not on time for meetings.", "I would rather workwith a person I liked who was not good at the job, rather than work with someone I did not likeeven if they were good at the job.", "I would rather work on a task as part of a team rather thantake responsibility for it myself.", "When I am faced with a challenge I think more about theresults of succeeding than the effects of failing.", "I get up early, stay late or skip meals if I havea deadline for some work that needs to be done.", "I find it easy to relax on holiday and forgetabout work."],
			c2: ["I tend not to like to stand out or be unconventional.", "At work, I oftentake over projects and steer them my way without worrying about what other people think.", "Ilike a lot of guidance to be really clear about what to do in work.", "I rarely need or want anyassistance and like to put my own stamp on work that I do.", "I usually do what is expected ofme and follow instructions carefully.", "I get annoyed if superiors or colleagues take credit formy work."],
			c3: ["I rarely day dream.", "Sometimes people find my ideas unusual.", "Sometimes I think about information almost obsessively until I come up with new ideas andsolutions.", "I do not like unexpected changes to my weekly routines.", "I am wary of newideas, gadgets and technologies.", "Other people think that I‘m always making changes andtrying out new ideas.", "I prefer to be quite good at several things rather than very good at onething.", "I prefer doing things in the usual way rather than trying out new methods.", "I like tohave my life organized so that it runs smoothly and to plan.", "I like to spend time with peoplewho have different ways of thinking.", "Sometimes I have so many ideas that I feelpressurized.", "It is harder for me to adapt to change than keep to a routine."],
			c4: ["Capable people who fail to become successful have not usuallytaken chances when they have occurred.", "You are either naturally good at something or you arenot, effort makes no difference.", "Many of the bad times that people experience are due to badluck.", "When I make plans I nearly always achieve them.", "People generally get what theydeserve.", "I try to accept that things happen to me in life for a reason.", "You are not likely tobe successful unless you are in the right place at the right time.", "Being successful is a result ofworking hard, luck has little to do with it.", "For me, getting what I want is a just reward for myefforts.", "I believe that destiny determines what happens to me in life.", "People&#39;s failures arerarely the result of their poor judgment.", "I get what I want from life because I work hard tomake it happen."],
			c5: ["I like to test boundaries and get into areas where few have workedbefore.", "I would rather buy a lottery ticket than enter a competition.", "I would prefer to havea moderate income in a secure job rather than a high income in a job that depended on myperformance.", "If I wanted to achieve something and the chances of success were 50/50 I wouldtake the risk.", "If I had a good idea for making some money, I would be willing to invest mytime and borrow money to enable me to do it.", "If there is a chance of failure I would rather notdo it.", "Before I make a decision I like to have all the facts no matter how long it takes.", "Before making an important decision I prefer to weigh up the pro&#39;s and con&#39;s fairly quicklyrather than spending a long time thinking about it.", "I would rather take an opportunity thatmight lead to even better things than have an experience that I am sure to enjoy.", "I find itdifficult to ask for favors from other people.", "What we are used to is usually better than what isunfamiliar.", "I like to start interesting projects even if there is no guaranteed payback for themoney or time I have to put in."],
		},
		si: {
			c1: ["වැටුප් , විශ්‍රාම වැටුප් හා අනෙකුත් දීමනා හොඳ තත්ත්වයේ  ඇත්නම් ඒකාකාරී, අභියෝගාත්මක නොවන සේවයක යෙදීමට මා හට ගැටලුවක් නොවේ.", "සමහරවිට රාජකාරි කටයුතු වලින් පූර්ණ ලෙස ඉවත් වීම මට අපහසුය.", "මාගේ හැකියාවන් දියුණු කරගැනීමට හැකිවන අභියෝගවලට මුහුණ දීමට මම කැමති වන අතර මට පහසුවෙන් කළ හැකි දේ කිරීම සතුටක් නොවේ.", "යම් කාර්‍යයක් ගැන මට ගැටලු ඇති වුවත්, එය අත්හැර දමා, අමතක කර වෙනත් කාර්‍යයක් කිරීමට මම යොමු වෙමි.", "අනාගතයට වඩා මම වර්තමානය සහ අනාගතය ගැන සිතමි.", "මිනිසුන් සතුටු කිරීමට වඩා වැදගත් වන්නේ කාර්‍යය නිසිපරිදි සිදු කිරීමයි.", "අන් අය රැස්වීම්වලට වෙලාවට නොපැමිණීම මා තරහ ගැන්වෙන කාරණයකි.", "රාජකාරියෙහි දක්ෂ අයෙකු වුවත් ඔහු මා ප්‍රිය නොකරන්නෙකු නම් ඔහු සමග වැඩ කිරීමට වඩා මා ප්‍රිය කරන එහෙත් කාර්යයෙහි එතරම් දක්ෂ නොවන්නෙකු සමග වැඩ කිරීමට මා කැමැත්තෙමි.", "තනිවම වගකීම භාරගැනීමට වඩා, කණ්ඩායමක් වශයෙන් ඉලක්කයට ගමන් කිරීමට මම කැමැත්තෙමි.", "මා අභියෝගයකට මුහුණ දී සිටින විට සාර්ථක වීමේ ප්‍රතිඵල ගැන වැඩිපුර සිතන අතර අසාර්ථක වීම ගැන නොසිතමි.", "ඉටු කළ යුතු කාර්‍යයක් සඳහා නියමිත කාල සීමාවක් ලබා දී තිබෙන විටෙක  ඒ උදෑසන අවදි වී නින්දට යෑම මෙන්ම යම් ආහාර වේල් මගහැරීම ද මම සිදු කරමි.", "නිවාඩු දිනවල දී රාජකාරි අමතක කොට, නිදහසේ ගත කිරීම මට පහසුය."],
			c2: ["කැපීපෙනී සිටීමට හෝ සාම්ප්‍රදායික නොවන කටයුතු කිරීමට මගේ කැමැත්තක් නැත.", "රැකියාවේ දී අන් අය සිතන දේ ගැන නොතකා, ව්‍යාපෘති ලබාගෙන ඒවා මගේ කැමැති ක්‍රමයට කරගෙන යාමට මම කැමතිය.", "රාජකාරියේදී කල යුත්තේ කුමක්ද යන්න වඩා හොඳින් නිරවුල් කර ගැනීම සඳහා උපදෙස් ලබා ගැනීමට, මම කැමති වෙමි.", "මාගේ වැඩ තනියම කරගැනීමට මම කැමති අතර කලාතුරකින් අන් අයගේ උපකාර අවශ්‍යවේ.", "මම මගෙන් බලාපොරොත්තු වන දේ ඉටු කරන අතර, උපදෙස් නිසි පරිදි පිළිපදිමි.", "මාගේ ඉහළ නිලධාරින් හෝ කණ්ඩායමේ සාමාජිකයින් මා කළ වැඩ සඳහා පැසසුම් ලැබීම මම ප්‍රිය නොකරමි."],
			c3: ["මම දවල් හින නොදකිමි.", "මාගෙ අදහස් අසාමාන්‍ය බව සමහරවිට අන් අය සිතති.", "මම සමහර අවස්ථාවලදී නව කරුණු හෝ විසඳුම්ලැබෙන තුරු, දැනට තිබෙන තොරතුරු වෙත යොමු වීමට කටයුතු කරමි.", "මාගේ සතිපතා වැඩසටහනට බලාපොරොත්තු රහිත වෙනස්කම් සිදුවීම, මම ප්‍රිය නොකරමි.", " නව අදහස්, උපකරණ හා තාක්ෂණය ගැන මම පරීක්ෂාකාරී වන්නෙමි.", "මා නිතර වෙනස්කම් සිදු කරන සහ නව අදහස් අත්හදා බැලීමට උත්සාහ කරන අයෙකු ලෙස අන් අය සලකති.", "එක් දෙයක් සම්බන්ධව ඉතා හොඳ වීමට වඩා කරුණු කිහිපයක් සම්බන්ධව සාමාන්‍යයෙන් හොඳ මට්ටමට පැමිණීමට මම කැමැත්තෙමි.", "නව ක්‍රමවේදයන් අතහදා බැලීමට වඩා සාමාන්‍ය ක්‍රමයට කටයුතු කිරීමට මම ප්‍රිය කරමි.", "මම මගේ ජීවිතය සංවිධානාත්මක ව ගෙන යාමට කැමැත්තෙමි. එමගින් මගේ ජීවිතය සැලසුමකට අනුව පහසුවෙන් ගලායයි.", "වෙනස් ආකාරයේ සිතුම් පැතුම් ඇත්තන් හා කාලය ගත කිරීමට, මම කැමැත්තෙමි.", "පීඩනයට ලක්වන තරමටම යම් අවස්ථාවල මා හට අදහස් රාශියක් ජනිත වේ.", "ඒකාකාරී රටාවක සිට වෙනස් රටාවකට හුරුවීම මා හට අපහසු ය."],
			c4: ["දියුණු වීමට හැකියාව ඇති සමහර අයට සාර්ථකත්වයක් ලැබීමට නොහැකි වූයේ ඔවුන්ට ලැබුණු අවස්ථා ප්‍රයෝජනයට නොගැනීම නිසා ය.", "ඔබ යම් කාර්‍යයක් සඳහා දක්ෂ වීම හෝ නොවීම සිදුවිය හැක. උත්සාහ කිරීමෙන් කිසිදු වෙනසක් සිදු නොවන බව මම සිතමි.", "මිනිසුන්ට නරක කාලයක් වන අවස්ථා බොහෝවිට ළඟාවන්නේ අවාසනාවටයි.", "මම සකස්කරන සැලසුම් සැමවිටම පාහේ, මම සාර්ථකව ඉටු කර ගනිමි.", "මිනිසුන්ට සාමාන්‍යයෙන් ලැබෙන්නේ, ඔවුන්ට හිමිවිය යුතු දේය.", "ජීවිතයේදී යම් දෙයක් වන්නේ යම් හේතුවක් නිසා බව පිළිගැනීමට මම උත්සාහ කරමි.", "ඔබ කලට වේලාවට වැඩ නොකළහොත් සාර්ථක නොවනු ඇත.", "සාර්ථකත්වය යනු ඉතා වෙහෙස වී ක්‍රියා කිරීමේ ප්‍රතිඵලයක් මිස වාසනාව මත ම පදනම් වූවක් නොවේ.", "මා හට අවශ්‍ය දේ ලැබීම මාගේ උත්සාහයන්ට ලැබෙන ප්‍රථිලාභයක් ලෙස මම සලකමි.", "මාගේ ජීවීතයේ මාහට කුමක් සිදු වේ දැයි දෛවය / ඉරණම තීරණය කරන බව මාගේ විශ්වාසයයි.", "මිනිසුන්ගේ අසාර්ථකවීම්, ඔවුන්ගේ දුර්වල තීරණවල ප්‍රතිඵලයකි.", " මම ඉතා වෙහෙස වී වැඩ කරන හෙයින්, මා හට ජීවිතේ ලබා ගත යුතු දේ ලබා ගනිමි."],
			c5: ["මෙයට පෙර සුලු පිරිසක් පමණක් සේවය කර ඇති අංශ / වපසරින් අත්හදා බැලීමට මම කැමැත්තෙමි.", "තරඟයට ඇතුල්වීමට වඩා ලොතරැයි ටිකට්පතක් මිළදී ගැනීමට මම නැඹුරු වෙමි.", "මාගේ වැඩි කැමැත්ත වන්නේ ක්‍රියාකාරීත්වය මත පදනම් වන ඉහළ ආදායම් උපදින රැකියාවකට වඩා සාමාන්‍යයෙන් ආදායම් අඩු වුවත් ආරක්ෂිත රැකියාවකට ය.", "මට යමක් සපුරා ගත යුතු විටෙක එහි සාර්ථක වීමේ අවස්ථාව 50/50 නම්, මම එම අවදානම  භාර ගන්නෙමි.", "යම් මුදලක් උපයා ගැනීම සඳහා හොඳ අදහසක් මා සතු වේ නම්, ඒ සඳහා මාගේ කාලය යොදවා එම කාර්ය සදහා ණය මුදලක්ද ලබා ගැනීමට පසුබට නොවෙමි.", "අසාර්ථකවීම පිළිබඳ අවදානමක් ඇත්නම්, මම බොහෝවිට එය නොකරමි.", "කෙතරම් දීර්ඝ කාලයක් ගත වුවත් තීරණයක් ගැනීමට ප්‍රථම සියලු කාරණා සලකා බැලීමට මම කැමැත්තෙමි.", "වැදගත් තීරණයක් ගැනීමට පෙර හොඳ හා නරක ප්‍රතිඵල ගැන ඉක්මනින් සලකා බැලීම මිස දීර්ඝ කාලයක් ඒ සඳහා මිඩංගු කිරීමට මම අකමැති වෙමි.", "මට භුක්ති  විඳිය හැකි බවට අත්දැකීමෙන් දන්නා දේට වඩා, හොඳ අවස්ථාවක් ලැබෙනවා නම් මම ඒ දේට වැඩියෙන් කැමති වෙමි.", "අන් අයගේ යම් විශේෂ සැලකීමක් ඉල්ලා සිටීම මා හට අපහසු කාරණයකි.", "අප හුරු පුරුදු දේ, අපට එතරම් හුරු නොවන දේට වඩා සුදුසු වේ.", "මා වියදම් කරන මුදලට හෝ මිඩංගු කරන කාලයට සරිලන සහතික ප්‍රතිඵල නොමැති වුවත් මම ප්‍රිය කරමි."]
		},
		ta: {
			c1: ["ஊதியம் மற்றும் ஓய்வூதிய வாய்ப்புகள் நன்றாக இருந்தால் நான் சாதாரணமான சவாலற்ற வேலையை செய்வதைப் பற்றி கவனத்திற் கொள்ளமாட்டேன்.", "நான் முழுமையாக வேலைக்கு செல்லாமல்  இருப்பதை  கடினமாக எண்ணுகிறேன்.", "நான் என் திறமைகளை கொண்டு வேலை செய்யும் சவால்களையே விரும்புகிறேன் அத்தோடு என்னால் மிகவும் எளிதாக செய்ய முடிந்த வேலைகளை  செய்வதில் சலித்துவிடுகின்றேன்.", "எனக்கு ஒரு பணியை செய்வதில் பிரச்சினை இருந்தால் நான் அவ்வேலையைப்  பற்றி மறந்துவிட்டு வேறேதாவது வேலையை செய்ய நகர்ந்து விடுகின்றேன்.", "நான் எதிர்காலத்தைப் பற்றி நினைப்பதை விட, நிகழ்காலத்தைப்  பற்றியும்  கடந்த காலத்தைப் பற்றியுமே அதிகமாக  நினைக்கிறேன்.", "மக்களைப் பிரியப்படுத்துவதற்கு முயலுவதை விட ஒரு வேலையை சிறப்பாக செய்வது மிகவும் முக்கியம்.", "சரியான நேரத்திற்கு மக்கள் கூட்டத்திற்கு வரவில்லை என்றால் நான் எரிச்சலடைகின்றேன்.", "நான்நன்றாக வேலை செய்யாத எனக்கு பிடித்த ஒருவருடன் வேலை செய்வதை விட எனக்கு பிடிக்காத நன்றாக வேலை செய்யும் ஒருவருடன் செயலாற்ற எண்ணுகிறேன்.", "நான் மட்டும் ஒரு விடயத்தை பொறுப்பேற்றுக் கொள்வதற்கு பதிலாக ஒரு குழுவின் உறுப்பினராக இருந்து  அதை  செய்ய விரும்புவேன்.", "நான் ஒரு சவாலை எதிர்கொள்ளும் போது தோல்வி விளைவுகளை விட வெற்றிபெறும் விளைவுகளை பற்றியே அதிகம் சிந்திக்கிறேன்.", "சில நேரங்களில் வேலைக்கான காலக்கெடு குறைவாக இருந்தால்  நான் நேரத்தோடு எழுந்திருக்கிறேன்,   உணவு உண்பதையும் தள்ளிப்போடுகின்றேன்.", "விடுமுறை நாட்களில் ஓய்வெடுக்கவும் வேலையை மறக்கவும் எனக்கு இவலகுவாக உள்ளது."],
			c2: ["நான்  சமுதாயத்திற்கு வழக்கத்திற்கு மாறாக இருக்க விரும்பவில்லை.", "நான்  மற்றவர்களை என்ன நினைப்பார்கள் என்று கவலைப்படாமல் எனக்கு    கொடுக்கப்பட்ட வேலையை சிறப்பாக   செய்வேன்.", "நான் எவ்வாறு வேலை செய்வது என்பது பற்றி தெளிவு பெறுவதற்காக எனக்கு நிறைய வழிகாட்டல்களை தேவை.", "நான் சுயமாகவே வேலைகளைச் செய்ய விரும்புகிறேன்.எனக்கு மிக அரிதாகவே மற்றொருவரின் உதவி தேவையாகவுள்ளது.", "பொதுவாக என்னிடமிருந்து என்ன எதிர்பார்க்கின்றார்களோ அதையே செய்கிறேன். அத்தோடு நான் அறிவுறுத்தல்களையும் கவனமாக பின்பற்றுகின்றேன்.", "நான் எனது பணிக்காக உயர் அதிகாரிகள் அல்லது சக ஊழியர்கள் நன்மதிப்பை பெற்றால் அது  எனக்கு எரிச்சலூட்டுகிறது."],
			c3: ["நான் பகற்கனவு   காண்பது அரிது.", "சில நேரங்களில் மக்கள் என் கருத்துகளை அசாதாரணமாக கருதுகின்றார்கள்.", "புதிய யோசனைகள் மற்றும் தீர்வுகள் தோன்றும் வரையில் அது தொடர்பான  சில தகவல்களை நான் பெரிதாக கவனத்திற் கொள்வதில்லை.", "நான் எனது நாளாந்த நடைமுறைகளை மாற்ற  விரும்பவில்லை.", "நான் புதிய யோசனைகள் மற்றும் தொழில்நுட்பங்களைப் பற்றி  எச்சரிக்கையாக இருக்கிறேன்.", "மற்றவர்கள் நான் எப்போதும் மாற்றங்களைச் செய்வதோடு புதிய யோசனைகளை முயற்சி செய்கிறேன் என்று நினைக்கிறார்கள்.", "நான் ஒரு விஷயத்தில் மிகச் சிறப்பாக இருப்பதை  விட பல விஷயங்களில்   சிறப்பாக இருக்க விரும்புகிறேன்.", "நான்  புதிய வழியில் முயற்சி செய்வதை விட வழக்கமான வழிகளில் விஷயங்களைச் செய்ய விரும்புகிறேன்.", "நான் எனது வாழ்கை ஒழுங்கமைகப்பட்ட படி இயங்குவதையே  விரும்புகிறேன்.ஆகவே அது  திட்டவட்டமாகவும் நேர்த்தியாகவும் அமையும்.", "நான் வெவ்வேறு சிந்தனைகளைக் கொண்ட மக்களுடன்எனது நேரத்தை செலவிட விரும்புகிறேன்.", "சில நேரங்களில் நான் அழுத்ததிற்கு உள்ளாகும் போது  எனக்கு பல புதிய கருத்துக்கள் தோன்றுகின்றன.", "எனக்கு ஒரு வழக்கமான  ஒன்றைச் செய்வதை  விட மாற்றமொன்றுக்கு இசைவாக்கமடைவது  கடினமாக உள்ளது."],
			c4: ["தகுதி வாய்ந்தவர்கள் தோல்வி அடைவதற்கு காரணம் அவர்கள்  சந்தித்த வாய்ப்புகளை பயன்படுத்திக்கொள்ளாமையே காரணமாகும்.", "நீங்கள் இயல்பாகவே ஒரு வேலையில் சிறந்தவராக அல்லது அவ்வாறு அல்லாமல் இருப்பினும், முயற்சி எந்த மாற்றத்தையும் ஏற்படுத்தாது.", "பலர் அவர்களது கெட்ட அதிஷ்டத்தினாலயே பல தொல்விகளை அனுபவிக்கின்றனர்.", "நான் ஒன்றை  திட்டமிட்டு செய்யும் போது அதை அடைந்து விடுகின்றேன் அல்லது அதை அடைவற்கு நெருங்கிவிடுகின்றேன்.", "பொதுவாக  மக்கள்  அவர்களின் முயற்சிகேற்ற பலனைப் பெறுகிறார்கள்.", "என் வாழ்வில் நடப்பவை யாவும் ஒரு காரணத்திற்காகவே   நடக்கின்றன என்பதை ஏற்பதற்கு நான் முயற்சி செய்கிறேன்.", "நீங்கள் சரியான நேரத்தில்  சரியான இடத்தில் இருந்தாலன்றி நீங்கள்  வெற்றியாளராக ஆக முடியாது.", "வெற்றியடைவது கடினமாக உழைப்பதன் விளைவாகும், அதிர்ஷ்டம்  வெற்றிக்கு குறைவாகவே பங்களிக்கிறது.", "நான் என்ன பெறுகின்றேனோ அது என் முயற்சிகளுக்கான ஒரு வெகுமதி என்று நினைக்கின்றேன்.", "வாழ்க்கையில் எனக்கு என்ன நடக்கும் என்று விதியே தீர்மானிக்கிறது என்று நான் நம்புகிறேன்.", "மக்கள்  தோல்வியடைவது அவர்களின் பொருத்தமில்லா  தீர்ப்பின் விளைவாகவே ஆகும்.", "நான் வாழ்க்கையில் எதை விரும்புகிறேனோ அதையே பெறுகின்றேன் காரணம் அதை  பெறுவதற்கு  நான் கடினமாக உழைக்கிறேன்."],
			c5: ["எனது திறமைகளிற்கான எல்லைகளை சோதித்தறிந்த பின், நான் தகுதியானவரானால் சிலர் மட்டுமே ஈடுபட்டுள்ள சிறந்த வேலைகளைச்செய்வதற்கும் விரும்புகிறேன்.", "ஒரு போட்டிக்கு  நுழைவதை  விட நான் ஒரு லாட்டரி டிக்கெட் வாங்குவேன்.", "என்னுடைய திறமைக்கேற்ற ஒரு வேலையில் உயர்ந்த வருமானத்தை பெறுவதை  விட ஒரு பாதுகாப்பான பணியில் மிதமான வருவாயைப் பெறுவதையே விரும்புகிறேன்.", "நான் ஏதோ ஒன்றை சாதிக்க விரும்பினால், அதற்கான வெற்றி வாய்ப்பு 50/50 என்றாலும், நான் அதற்கான  ஆபத்தை எதிர்கொள்வேன்.", "பணம் சம்பாதிப்பதற்கு எனக்கு நல்ல வழி இருக்குமானால், என் நேரத்தை செலவழிக்கவும், அதை கடன் வாங்கி செய்யவும் தயாராக இருக்கிறேன்.", "ஒன்றில்  தோல்விக்கு வாய்ப்பு இருந்தால், அதை நான் செய்யாமல் இருப்பது சிறந்தது.", "நான் ஒரு முடிவை எடுப்பதற்கு முன் அது தொடர்பான எல்லா நன்மை தீமைகளையும், அதற்கு அதிக நேரம் எடுத்தாலும் கூட தெரிந்து கொள்ள விரும்புகிறேன்.", "ஒரு முக்கியமான முடிவை எடுப்பதற்கு முன்னர், அவற்றின் நன்மை தீமைகளை விரைவாக அளவிட   விரும்புகின்றேன். அவற்றைப் பற்றி சிந்திப்பதற்கு  நீண்ட  நேரத்தை செலவு  விட விரும்பவில்லை.", "எனக்கு நிச்சயமாக மகிழ்ச்சியைக் கொடுக்கும் ஒரு அனுபவத்தைக்  பெறும் ஒன்றைச் செய்வதை விட  சிறப்பான விளைவுகளைக் கொடுக்கும் புதிய  ஒரு வாய்ப்பை  பயன்படுத்த விரும்புவேன்.", "மற்றவர்களிடமிருந்து உதவிகளைக் கேட்பது எனக்கு கடினமாகும்.", " நான் மற்ற நபர்களிடமிருந்து ஆதாயங்களைக் கேட்கிறேன். ", " நாங்கள் எதைப் பயன்படுத்தினாலும் நான் சுவாரஸ்யமான திட்டங்களை ஆரம்பிக்க விரும்புகிறேன், அவை அவர்களுக்கு ரொம்ப ரொம்ப ரொம்ப ரொம்ப பிடிச்சிருக்கு."]
		}

	}


	var newqMap = {"c1":["I would not mind routine unchallenging work if the pay and pensionprospects were good. // වැටුප් , විශ්‍රාම වැටුප් හා අනෙකුත් දීමනා හොඳ තත්ත්වයේ  ඇත්නම් ඒකාකාරී, අභියෝගාත්මක නොවන සේවයක යෙදීමට මා හට ගැටලුවක් නොවේ. // ஊதியம் மற்றும் ஓய்வூதிய வாய்ப்புகள் நன்றாக இருந்தால் நான் சாதாரணமான சவாலற்ற வேலையை செய்வதைப் பற்றி கவனத்திற் கொள்ளமாட்டேன்.","I find it difficult to switch off from work completely. // සමහරවිට රාජකාරි කටයුතු වලින් පූර්ණ ලෙස ඉවත් වීම මට අපහසුය. // நான் முழுமையாக வேலைக்கு செல்லாமல்  இருப்பதை  கடினமாக எண்ணுகிறேன்.","I likechallenges that stretch my abilities and get bored with things I can do quite easily. // මාගේ හැකියාවන් දියුණු කරගැනීමට හැකිවන අභියෝගවලට මුහුණ දීමට මම කැමති වන අතර මට පහසුවෙන් කළ හැකි දේ කිරීම සතුටක් නොවේ. // நான் என் திறமைகளை கொண்டு வேலை செய்யும் சவால்களையே விரும்புகிறேன் அத்தோடு என்னால் மிகவும் எளிதாக செய்ய முடிந்த வேலைகளை  செய்வதில் சலித்துவிடுகின்றேன்.","If I amhaving problems with a task I leave it, forget it and move on to something else. // යම් කාර්‍යයක් ගැන මට ගැටලු ඇති වුවත්, එය අත්හැර දමා, අමතක කර වෙනත් කාර්‍යයක් කිරීමට මම යොමු වෙමි. // எனக்கு ஒரு பணியை செய்வதில் பிரச்சினை இருந்தால் நான் அவ்வேலையைப்  பற்றி மறந்துவிட்டு வேறேதாவது வேலையை செய்ய நகர்ந்து விடுகின்றேன்.","I think moreof the present and past than of the future. // අනාගතයට වඩා මම වර්තමානය සහ අනාගතය ගැන සිතමි. // நான் எதிர்காலத்தைப் பற்றி நினைப்பதை விட, நிகழ்காலத்தைப்  பற்றியும்  கடந்த காலத்தைப் பற்றியுமே அதிகமாக  நினைக்கிறேன்.","It is more important to do a job well than to try toplease people. // මිනිසුන් සතුටු කිරීමට වඩා වැදගත් වන්නේ කාර්‍යය නිසිපරිදි සිදු කිරීමයි. // மக்களைப் பிரியப்படுத்துவதற்கு முயலுவதை விட ஒரு வேலையை சிறப்பாக செய்வது மிகவும் முக்கியம்.","I get annoyed if people are not on time for meetings. // අන් අය රැස්වීම්වලට වෙලාවට නොපැමිණීම මා තරහ ගැන්වෙන කාරණයකි. // சரியான நேரத்திற்கு மக்கள் கூட்டத்திற்கு வரவில்லை என்றால் நான் எரிச்சலடைகின்றேன்.","I would rather workwith a person I liked who was not good at the job, rather than work with someone I did not likeeven if they were good at the job. // රාජකාරියෙහි දක්ෂ අයෙකු වුවත් ඔහු මා ප්‍රිය නොකරන්නෙකු නම් ඔහු සමග වැඩ කිරීමට වඩා මා ප්‍රිය කරන එහෙත් කාර්යයෙහි එතරම් දක්ෂ නොවන්නෙකු සමග වැඩ කිරීමට මා කැමැත්තෙමි. // நான்நன்றாக வேலை செய்யாத எனக்கு பிடித்த ஒருவருடன் வேலை செய்வதை விட எனக்கு பிடிக்காத நன்றாக வேலை செய்யும் ஒருவருடன் செயலாற்ற எண்ணுகிறேன்.","I would rather work on a task as part of a team rather thantake responsibility for it myself. // තනිවම වගකීම භාරගැනීමට වඩා, කණ්ඩායමක් වශයෙන් ඉලක්කයට ගමන් කිරීමට මම කැමැත්තෙමි. // நான் மட்டும் ஒரு விடயத்தை பொறுப்பேற்றுக் கொள்வதற்கு பதிலாக ஒரு குழுவின் உறுப்பினராக இருந்து  அதை  செய்ய விரும்புவேன்.","When I am faced with a challenge I think more about theresults of succeeding than the effects of failing. // මා අභියෝගයකට මුහුණ දී සිටින විට සාර්ථක වීමේ ප්‍රතිඵල ගැන වැඩිපුර සිතන අතර අසාර්ථක වීම ගැන නොසිතමි. // நான் ஒரு சவாலை எதிர்கொள்ளும் போது தோல்வி விளைவுகளை விட வெற்றிபெறும் விளைவுகளை பற்றியே அதிகம் சிந்திக்கிறேன்.","I get up early, stay late or skip meals if I havea deadline for some work that needs to be done. // ඉටු කළ යුතු කාර්‍යයක් සඳහා නියමිත කාල සීමාවක් ලබා දී තිබෙන විටෙක  ඒ උදෑසන අවදි වී නින්දට යෑම මෙන්ම යම් ආහාර වේල් මගහැරීම ද මම සිදු කරමි. // சில நேரங்களில் வேலைக்கான காலக்கெடு குறைவாக இருந்தால்  நான் நேரத்தோடு எழுந்திருக்கிறேன்,   உணவு உண்பதையும் தள்ளிப்போடுகின்றேன்.","I find it easy to relax on holiday and forgetabout work. // නිවාඩු දිනවල දී රාජකාරි අමතක කොට, නිදහසේ ගත කිරීම මට පහසුය. // விடுமுறை நாட்களில் ஓய்வெடுக்கவும் வேலையை மறக்கவும் எனக்கு இவலகுவாக உள்ளது."],"c2":["I tend not to like to stand out or be unconventional. // කැපීපෙනී සිටීමට හෝ සාම්ප්‍රදායික නොවන කටයුතු කිරීමට මගේ කැමැත්තක් නැත. // நான்  சமுதாயத்திற்கு வழக்கத்திற்கு மாறாக இருக்க விரும்பவில்லை.","At work, I oftentake over projects and steer them my way without worrying about what other people think. // රැකියාවේ දී අන් අය සිතන දේ ගැන නොතකා, ව්‍යාපෘති ලබාගෙන ඒවා මගේ කැමැති ක්‍රමයට කරගෙන යාමට මම කැමතිය. // நான்  மற்றவர்களை என்ன நினைப்பார்கள் என்று கவலைப்படாமல் எனக்கு    கொடுக்கப்பட்ட வேலையை சிறப்பாக   செய்வேன்.","Ilike a lot of guidance to be really clear about what to do in work. // රාජකාරියේදී කල යුත්තේ කුමක්ද යන්න වඩා හොඳින් නිරවුල් කර ගැනීම සඳහා උපදෙස් ලබා ගැනීමට, මම කැමති වෙමි. // நான் எவ்வாறு வேலை செய்வது என்பது பற்றி தெளிவு பெறுவதற்காக எனக்கு நிறைய வழிகாட்டல்களை தேவை.","I rarely need or want anyassistance and like to put my own stamp on work that I do. // මාගේ වැඩ තනියම කරගැනීමට මම කැමති අතර කලාතුරකින් අන් අයගේ උපකාර අවශ්‍යවේ. // நான் சுயமாகவே வேலைகளைச் செய்ய விரும்புகிறேன்.எனக்கு மிக அரிதாகவே மற்றொருவரின் உதவி தேவையாகவுள்ளது.","I usually do what is expected ofme and follow instructions carefully. // මම මගෙන් බලාපොරොත්තු වන දේ ඉටු කරන අතර, උපදෙස් නිසි පරිදි පිළිපදිමි. // பொதுவாக என்னிடமிருந்து என்ன எதிர்பார்க்கின்றார்களோ அதையே செய்கிறேன். அத்தோடு நான் அறிவுறுத்தல்களையும் கவனமாக பின்பற்றுகின்றேன்.","I get annoyed if superiors or colleagues take credit formy work. // මාගේ ඉහළ නිලධාරින් හෝ කණ්ඩායමේ සාමාජිකයින් මා කළ වැඩ සඳහා පැසසුම් ලැබීම මම ප්‍රිය නොකරමි. // நான் எனது பணிக்காக உயர் அதிகாரிகள் அல்லது சக ஊழியர்கள் நன்மதிப்பை பெற்றால் அது  எனக்கு எரிச்சலூட்டுகிறது."],"c3":["I rarely day dream. // මම දවල් හින නොදකිමි. // நான் பகற்கனவு   காண்பது அரிது.","Sometimes people find my ideas unusual. // මාගෙ අදහස් අසාමාන්‍ය බව සමහරවිට අන් අය සිතති. // சில நேரங்களில் மக்கள் என் கருத்துகளை அசாதாரணமாக கருதுகின்றார்கள்.","Sometimes I think about information almost obsessively until I come up with new ideas andsolutions. // මම සමහර අවස්ථාවලදී නව කරුණු හෝ විසඳුම්ලැබෙන තුරු, දැනට තිබෙන තොරතුරු වෙත යොමු වීමට කටයුතු කරමි. // புதிய யோசனைகள் மற்றும் தீர்வுகள் தோன்றும் வரையில் அது தொடர்பான  சில தகவல்களை நான் பெரிதாக கவனத்திற் கொள்வதில்லை.","I do not like unexpected changes to my weekly routines. // මාගේ සතිපතා වැඩසටහනට බලාපොරොත්තු රහිත වෙනස්කම් සිදුවීම, මම ප්‍රිය නොකරමි. // நான் எனது நாளாந்த நடைமுறைகளை மாற்ற  விரும்பவில்லை.","I am wary of newideas, gadgets and technologies. //  නව අදහස්, උපකරණ හා තාක්ෂණය ගැන මම පරීක්ෂාකාරී වන්නෙමි. // நான் புதிய யோசனைகள் மற்றும் தொழில்நுட்பங்களைப் பற்றி  எச்சரிக்கையாக இருக்கிறேன்.","Other people think that I‘m always making changes andtrying out new ideas. // මා නිතර වෙනස්කම් සිදු කරන සහ නව අදහස් අත්හදා බැලීමට උත්සාහ කරන අයෙකු ලෙස අන් අය සලකති. // மற்றவர்கள் நான் எப்போதும் மாற்றங்களைச் செய்வதோடு புதிய யோசனைகளை முயற்சி செய்கிறேன் என்று நினைக்கிறார்கள்.","I prefer to be quite good at several things rather than very good at onething. // එක් දෙයක් සම්බන්ධව ඉතා හොඳ වීමට වඩා කරුණු කිහිපයක් සම්බන්ධව සාමාන්‍යයෙන් හොඳ මට්ටමට පැමිණීමට මම කැමැත්තෙමි. // நான் ஒரு விஷயத்தில் மிகச் சிறப்பாக இருப்பதை  விட பல விஷயங்களில்   சிறப்பாக இருக்க விரும்புகிறேன்.","I prefer doing things in the usual way rather than trying out new methods. // නව ක්‍රමවේදයන් අතහදා බැලීමට වඩා සාමාන්‍ය ක්‍රමයට කටයුතු කිරීමට මම ප්‍රිය කරමි. // நான்  புதிய வழியில் முயற்சி செய்வதை விட வழக்கமான வழிகளில் விஷயங்களைச் செய்ய விரும்புகிறேன்.","I like tohave my life organized so that it runs smoothly and to plan. // මම මගේ ජීවිතය සංවිධානාත්මක ව ගෙන යාමට කැමැත්තෙමි. එමගින් මගේ ජීවිතය සැලසුමකට අනුව පහසුවෙන් ගලායයි. // நான் எனது வாழ்கை ஒழுங்கமைகப்பட்ட படி இயங்குவதையே  விரும்புகிறேன்.ஆகவே அது  திட்டவட்டமாகவும் நேர்த்தியாகவும் அமையும்.","I like to spend time with peoplewho have different ways of thinking. // වෙනස් ආකාරයේ සිතුම් පැතුම් ඇත්තන් හා කාලය ගත කිරීමට, මම කැමැත්තෙමි. // நான் வெவ்வேறு சிந்தனைகளைக் கொண்ட மக்களுடன்எனது நேரத்தை செலவிட விரும்புகிறேன்.","Sometimes I have so many ideas that I feelpressurized. // පීඩනයට ලක්වන තරමටම යම් අවස්ථාවල මා හට අදහස් රාශියක් ජනිත වේ. // சில நேரங்களில் நான் அழுத்ததிற்கு உள்ளாகும் போது  எனக்கு பல புதிய கருத்துக்கள் தோன்றுகின்றன.","It is harder for me to adapt to change than keep to a routine. // ඒකාකාරී රටාවක සිට වෙනස් රටාවකට හුරුවීම මා හට අපහසු ය. // எனக்கு ஒரு வழக்கமான  ஒன்றைச் செய்வதை  விட மாற்றமொன்றுக்கு இசைவாக்கமடைவது  கடினமாக உள்ளது."],"c4":["Capable people who fail to become successful have not usuallytaken chances when they have occurred. // දියුණු වීමට හැකියාව ඇති සමහර අයට සාර්ථකත්වයක් ලැබීමට නොහැකි වූයේ ඔවුන්ට ලැබුණු අවස්ථා ප්‍රයෝජනයට නොගැනීම නිසා ය. // தகுதி வாய்ந்தவர்கள் தோல்வி அடைவதற்கு காரணம் அவர்கள்  சந்தித்த வாய்ப்புகளை பயன்படுத்திக்கொள்ளாமையே காரணமாகும்.","You are either naturally good at something or you arenot, effort makes no difference. // ඔබ යම් කාර්‍යයක් සඳහා දක්ෂ වීම හෝ නොවීම සිදුවිය හැක. උත්සාහ කිරීමෙන් කිසිදු වෙනසක් සිදු නොවන බව මම සිතමි. // நீங்கள் இயல்பாகவே ஒரு வேலையில் சிறந்தவராக அல்லது அவ்வாறு அல்லாமல் இருப்பினும், முயற்சி எந்த மாற்றத்தையும் ஏற்படுத்தாது.","Many of the bad times that people experience are due to badluck. // මිනිසුන්ට නරක කාලයක් වන අවස්ථා බොහෝවිට ළඟාවන්නේ අවාසනාවටයි. // பலர் அவர்களது கெட்ட அதிஷ்டத்தினாலயே பல தொல்விகளை அனுபவிக்கின்றனர்.","When I make plans I nearly always achieve them. // මම සකස්කරන සැලසුම් සැමවිටම පාහේ, මම සාර්ථකව ඉටු කර ගනිමි. // நான் ஒன்றை  திட்டமிட்டு செய்யும் போது அதை அடைந்து விடுகின்றேன் அல்லது அதை அடைவற்கு நெருங்கிவிடுகின்றேன்.","People generally get what theydeserve. // මිනිසුන්ට සාමාන්‍යයෙන් ලැබෙන්නේ, ඔවුන්ට හිමිවිය යුතු දේය. // பொதுவாக  மக்கள்  அவர்களின் முயற்சிகேற்ற பலனைப் பெறுகிறார்கள்.","I try to accept that things happen to me in life for a reason. // ජීවිතයේදී යම් දෙයක් වන්නේ යම් හේතුවක් නිසා බව පිළිගැනීමට මම උත්සාහ කරමි. // என் வாழ்வில் நடப்பவை யாவும் ஒரு காரணத்திற்காகவே   நடக்கின்றன என்பதை ஏற்பதற்கு நான் முயற்சி செய்கிறேன்.","You are not likely tobe successful unless you are in the right place at the right time. // ඔබ කලට වේලාවට වැඩ නොකළහොත් සාර්ථක නොවනු ඇත. // நீங்கள் சரியான நேரத்தில்  சரியான இடத்தில் இருந்தாலன்றி நீங்கள்  வெற்றியாளராக ஆக முடியாது.","Being successful is a result ofworking hard, luck has little to do with it. // සාර්ථකත්වය යනු ඉතා වෙහෙස වී ක්‍රියා කිරීමේ ප්‍රතිඵලයක් මිස වාසනාව මත ම පදනම් වූවක් නොවේ. // வெற்றியடைவது கடினமாக உழைப்பதன் விளைவாகும், அதிர்ஷ்டம்  வெற்றிக்கு குறைவாகவே பங்களிக்கிறது.","For me, getting what I want is a just reward for myefforts. // මා හට අවශ්‍ය දේ ලැබීම මාගේ උත්සාහයන්ට ලැබෙන ප්‍රථිලාභයක් ලෙස මම සලකමි. // நான் என்ன பெறுகின்றேனோ அது என் முயற்சிகளுக்கான ஒரு வெகுமதி என்று நினைக்கின்றேன்.","I believe that destiny determines what happens to me in life. // මාගේ ජීවීතයේ මාහට කුමක් සිදු වේ දැයි දෛවය / ඉරණම තීරණය කරන බව මාගේ විශ්වාසයයි. // வாழ்க்கையில் எனக்கு என்ன நடக்கும் என்று விதியே தீர்மானிக்கிறது என்று நான் நம்புகிறேன்.","People&#39;s failures arerarely the result of their poor judgment. // මිනිසුන්ගේ අසාර්ථකවීම්, ඔවුන්ගේ දුර්වල තීරණවල ප්‍රතිඵලයකි. // மக்கள்  தோல்வியடைவது அவர்களின் பொருத்தமில்லா  தீர்ப்பின் விளைவாகவே ஆகும்.","I get what I want from life because I work hard tomake it happen. //  මම ඉතා වෙහෙස වී වැඩ කරන හෙයින්, මා හට ජීවිතේ ලබා ගත යුතු දේ ලබා ගනිමි. // நான் வாழ்க்கையில் எதை விரும்புகிறேனோ அதையே பெறுகின்றேன் காரணம் அதை  பெறுவதற்கு  நான் கடினமாக உழைக்கிறேன்."],"c5":["I like to test boundaries and get into areas where few have workedbefore. // මෙයට පෙර සුලු පිරිසක් පමණක් සේවය කර ඇති අංශ / වපසරින් අත්හදා බැලීමට මම කැමැත්තෙමි. // எனது திறமைகளிற்கான எல்லைகளை சோதித்தறிந்த பின், நான் தகுதியானவரானால் சிலர் மட்டுமே ஈடுபட்டுள்ள சிறந்த வேலைகளைச்செய்வதற்கும் விரும்புகிறேன்.","I would rather buy a lottery ticket than enter a competition. // තරඟයට ඇතුල්වීමට වඩා ලොතරැයි ටිකට්පතක් මිළදී ගැනීමට මම නැඹුරු වෙමි. // ஒரு போட்டிக்கு  நுழைவதை  விட நான் ஒரு லாட்டரி டிக்கெட் வாங்குவேன்.","I would prefer to havea moderate income in a secure job rather than a high income in a job that depended on myperformance. // මාගේ වැඩි කැමැත්ත වන්නේ ක්‍රියාකාරීත්වය මත පදනම් වන ඉහළ ආදායම් උපදින රැකියාවකට වඩා සාමාන්‍යයෙන් ආදායම් අඩු වුවත් ආරක්ෂිත රැකියාවකට ය. // என்னுடைய திறமைக்கேற்ற ஒரு வேலையில் உயர்ந்த வருமானத்தை பெறுவதை  விட ஒரு பாதுகாப்பான பணியில் மிதமான வருவாயைப் பெறுவதையே விரும்புகிறேன்.","If I wanted to achieve something and the chances of success were 50/50 I wouldtake the risk. // මට යමක් සපුරා ගත යුතු විටෙක එහි සාර්ථක වීමේ අවස්ථාව 50/50 නම්, මම එම අවදානම  භාර ගන්නෙමි. // நான் ஏதோ ஒன்றை சாதிக்க விரும்பினால், அதற்கான வெற்றி வாய்ப்பு 50/50 என்றாலும், நான் அதற்கான  ஆபத்தை எதிர்கொள்வேன்.","If I had a good idea for making some money, I would be willing to invest mytime and borrow money to enable me to do it. // යම් මුදලක් උපයා ගැනීම සඳහා හොඳ අදහසක් මා සතු වේ නම්, ඒ සඳහා මාගේ කාලය යොදවා එම කාර්ය සදහා ණය මුදලක්ද ලබා ගැනීමට පසුබට නොවෙමි. // பணம் சம்பாதிப்பதற்கு எனக்கு நல்ல வழி இருக்குமானால், என் நேரத்தை செலவழிக்கவும், அதை கடன் வாங்கி செய்யவும் தயாராக இருக்கிறேன்.","If there is a chance of failure I would rather notdo it. // අසාර්ථකවීම පිළිබඳ අවදානමක් ඇත්නම්, මම බොහෝවිට එය නොකරමි. // ஒன்றில்  தோல்விக்கு வாய்ப்பு இருந்தால், அதை நான் செய்யாமல் இருப்பது சிறந்தது.","Before I make a decision I like to have all the facts no matter how long it takes. // කෙතරම් දීර්ඝ කාලයක් ගත වුවත් තීරණයක් ගැනීමට ප්‍රථම සියලු කාරණා සලකා බැලීමට මම කැමැත්තෙමි. // நான் ஒரு முடிவை எடுப்பதற்கு முன் அது தொடர்பான எல்லா நன்மை தீமைகளையும், அதற்கு அதிக நேரம் எடுத்தாலும் கூட தெரிந்து கொள்ள விரும்புகிறேன்.","Before making an important decision I prefer to weigh up the pro&#39;s and con&#39;s fairly quicklyrather than spending a long time thinking about it. // වැදගත් තීරණයක් ගැනීමට පෙර හොඳ හා නරක ප්‍රතිඵල ගැන ඉක්මනින් සලකා බැලීම මිස දීර්ඝ කාලයක් ඒ සඳහා මිඩංගු කිරීමට මම අකමැති වෙමි. // ஒரு முக்கியமான முடிவை எடுப்பதற்கு முன்னர், அவற்றின் நன்மை தீமைகளை விரைவாக அளவிட   விரும்புகின்றேன். அவற்றைப் பற்றி சிந்திப்பதற்கு  நீண்ட  நேரத்தை செலவு  விட விரும்பவில்லை.","I would rather take an opportunity thatmight lead to even better things than have an experience that I am sure to enjoy. // මට භුක්ති  විඳිය හැකි බවට අත්දැකීමෙන් දන්නා දේට වඩා, හොඳ අවස්ථාවක් ලැබෙනවා නම් මම ඒ දේට වැඩියෙන් කැමති වෙමි. // எனக்கு நிச்சயமாக மகிழ்ச்சியைக் கொடுக்கும் ஒரு அனுபவத்தைக்  பெறும் ஒன்றைச் செய்வதை விட  சிறப்பான விளைவுகளைக் கொடுக்கும் புதிய  ஒரு வாய்ப்பை  பயன்படுத்த விரும்புவேன்.","I find itdifficult to ask for favors from other people. // අන් අයගේ යම් විශේෂ සැලකීමක් ඉල්ලා සිටීම මා හට අපහසු කාරණයකි. // மற்றவர்களிடமிருந்து உதவிகளைக் கேட்பது எனக்கு கடினமாகும்.","What we are used to is usually better than what isunfamiliar. // අප හුරු පුරුදු දේ, අපට එතරම් හුරු නොවන දේට වඩා සුදුසු වේ. //  நான் மற்ற நபர்களிடமிருந்து ஆதாயங்களைக் கேட்கிறேன். ","I like to start interesting projects even if there is no guaranteed payback for themoney or time I have to put in. // මා වියදම් කරන මුදලට හෝ මිඩංගු කරන කාලයට සරිලන සහතික ප්‍රතිඵල නොමැති වුවත් මම ප්‍රිය කරමි. //  நாங்கள் எதைப் பயன்படுத்தினாலும் நான் சுவாரஸ்யமான திட்டங்களை ஆரம்பிக்க விரும்புகிறேன், அவை அவர்களுக்கு ரொம்ப ரொம்ப ரொம்ப ரொம்ப பிடிச்சிருக்கு."]}

	function createQuectionHtml(qNumber, text, category) {
		var radioName = category + '-q-' + qNumber;
		var output = "";
		output += '<div class="field" data-translatable>';
		output += qNumber + '. ' + text;
		output += '</div>';
		output += '<div class="field half">';
		output += '<input type="radio" name="' + radioName + '" value="1" id="' + radioName + 'y' + '">';
		output += '<label for="' + radioName + 'y' + '" data-translatable>Yes // ඔව් // ஆம்</label>';
		output += '</div>';
		output += '<div class="field half">';
		output += '<input type="radio" name="' + radioName + '" value="0" id="' + radioName + 'n' + '">';
		output += '<label for="' + radioName + 'n' + '" data-translatable>No // නැත // இல்லை</label>';
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


	// $.each(newqMap, function (category, quectionList) {
	// 	totalsMap[category] = quectionList.length;
	// 	var quectionHolder = $("#" + category).find(".quections");
	// 	$.each(quectionList, function (n, text) {
	// 		quectionHolder.append(createQuectionHtml(n + 1, text, category));
	// 	})
	// 	console.log(quectionHolder.html())
	// });

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
					lablesVals.push(categoryMap[en][i]);
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

	tippy.setDefaults({
		arrow: true,
		delay: 40,
		theme: 'my-tippy',
		placement: 'bottom'
	})

	ecI18n.changeLanguage(ecLanguage);

})(jQuery);