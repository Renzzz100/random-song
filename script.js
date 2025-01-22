// Array of songs
let songs = [];

// DOM Elements
const randomButton = document.getElementById("randomButton");
const output = document.getElementById("output");
const addSongButton = document.getElementById("addSongButton");
const newSongInput = document.getElementById("newSongInput");
const songList = document.getElementById("songList");

// Render initial song list
function renderSongList() {
	songList.innerHTML = ""; // Clear list
	songs.forEach((song, index) => {
		const li = document.createElement("li");
		li.classList.add("list-group-item");
		li.textContent = song;

		// Delete song on click
		li.addEventListener("click", () => {
			Swal.fire({
				title: "Remove Song?",
				text: `Are you sure you want to remove "${song}"?`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, remove it!",
				cancelButtonText: "Cancel",
			}).then((result) => {
				if (result.isConfirmed) {
					songs.splice(index, 1); // Remove from array
					renderSongList(); // Re-render list
					Swal.fire(
						"Removed!",
						`"${song}" has been removed from your playlist.`,
						"success"
					);
				}
			});
		});

		songList.appendChild(li);
	});
}

// Initialize song list
renderSongList();

// Random Song Button
randomButton.addEventListener("click", () => {
	if (songs.length === 0) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "No songs available. Add a new song!",
		});
		return;
	}

	randomButton.disabled = true; // Disable button temporarily
	Swal.fire({
		title: "Loading...",
		timer: 1000,
		timerProgressBar: true,
		didOpen: () => {
			Swal.showLoading();
		},
		willClose: () => {
			const randomIndex = Math.floor(Math.random() * songs.length);
			const randomSong = songs[randomIndex];
			output.textContent = `🎵 ${randomSong}`;
			randomButton.disabled = false; // Re-enable button
		},
	});
});

// Add New Song
addSongButton.addEventListener("click", () => {
	const newSong = newSongInput.value.trim();
	if (newSong) {
		songs.push(newSong);
		newSongInput.value = ""; // Clear input
		renderSongList(); // Update list
		Swal.fire({
			icon: "success",
			title: "Song Added!",
			text: `"${newSong}" has been added to your playlist.`,
		});
	} else {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Please enter a valid song name.",
		});
	}
});
