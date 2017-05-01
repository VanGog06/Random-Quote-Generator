$(() => {
	$(".random-quote").click((e) => {
		e.preventDefault();

        getRandomQuote();
	});

    function getRandomQuote() {
        let quoteURL = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
        let quoteRequest = {
            url: quoteURL,
			cache: false
        };

        $.ajax(quoteRequest)
            .then((quoteObj) => {
                displayQuote(quoteObj[0]);
                modifyTwitterHref();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function displayQuote(quote) {
        let quote_box = $(".quote-box");
        $(quote_box).empty();

        let quote_content = quote.content;
        let quote_title = $('<cite class="cite">').text("- " + quote.title);

        $(quote_box).append(quote_content);
        $(quote_box).append(quote_title);
    }
});

function modifyTwitterHref() {
	let quote_box = $(".quote-box");
	let twitter_post = $(".twitter-post");
	let base_href = "https://twitter.com/share?hashtags=quoteoftheday&url=google.com&text=";

	let quote = encodeURI($(quote_box).find("p").text());
	let new_href = base_href + quote;

	$(twitter_post).attr("href", new_href);
}

