/* RiveScript.com "Try Online" Script */
window.bot = null;

document.addEventListener('DOMContentLoaded', () => {

	const $version = document.querySelector("#rivescript-version");
	const $template = document.querySelector("#template");
	const $editor = document.querySelector("#editor");
	const $execute = document.querySelector("#execute");
	const $dialogue = document.querySelector("#dialogue");
	const $message = document.querySelector("#message");
	const $chatModal = document.querySelector("#chatModal");

	async function loadTemplate(template) {
		$template.disabled = true;

		// Get the template.
		fetch("/static/try/templates/" + template).then(
			data => data.text(),
		).then(data => {
			$editor.value = data;
			$template.value = "";
			$template.disabled = null;
		}).catch(err => {
			window.alert(err);
			$template.val("");
			$template.removeAttr("disabled", "");
		});
	}

	// Show the version number being used.
	$version.innerText = `RiveScript-JS version ${new RiveScript().version()}`;

	// Hook up the template selector.
	$template.addEventListener('change', (e) => {
		var template = $template.value;
		loadTemplate(template);
	});
	loadTemplate("rs-standard.rive");

	// The execute button!
	$execute.addEventListener('click', (e) => {
		// Get their code.
		var code = $editor.value;
		if (code.length == 0) {
			window.alert("You didn't enter any RiveScript code!");
			return false;
		}

		// Initialize the bot.
		window.bot = new RiveScript();
		window.bot.setHandler("coffeescript", new RSCoffeeScript(window.bot));
		window.bot.stream(code, function(error) {
			window.alert("Error in your RiveScript code:\n\n" + error);
		});
		window.bot.sortReplies();

		// Reset the dialogue.
		$dialogue.value = "";

		$chatModal.classList.add('is-active');
		window.requestAnimationFrame(() => {
			$message.focus();
		});
	});

	// The Enter key.
	$message.addEventListener('keydown', (e) => {
		if (e.keyCode == 13) {

			if (window.bot === null) {
				return; // No bot? Weird.
			}

			var message = $message.value;
			if (message.length == 0) {
				return;
			}

			// Echo the user immediately and clear their input.
			$dialogue.innerHTML += `<div><span class="try-user">User:</span> ${message}</div>`;
			$message.value = "";

			// Fetch the reply.
			window.bot.reply("local-user", message).then((reply) => {
				reply = reply.replace(new RegExp("\n", "g"), "<br>");

				// Update the dialogue.
				$dialogue.innerHTML += `<div><span class="try-bot">Bot:</span> ${reply}`;

				// Scroll to bottom.
				$dialogue.scrollTop = $dialogue.scrollHeight;
			});
		}
	})
});
