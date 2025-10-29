(() => {
  // Enable strict mode for cleaner, safer JavaScript
  'use strict';

  // =====================================================
  // PART 1: Bootstrap Form Validation (Client-side)
  // =====================================================

  // Select all forms on the page that have the class 'needs-validation'
  const forms = document.querySelectorAll('.needs-validation');

  // Loop through each form and add a submit event listener
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {

      // If form is not valid (based on 'required' fields, etc.)
      if (!form.checkValidity()) {
        // Stop the form from being submitted
        event.preventDefault();
        event.stopPropagation(); // Stop event from bubbling up
      }

      // Add Bootstrap's class to show validation feedback
      form.classList.add('was-validated');
    }, false);
  });

  // =====================================================
  // PART 2: Review Section Logic
  // Runs only after the entire DOM is loaded
  // =====================================================

  document.addEventListener("DOMContentLoaded", () => {
    // Function to toggle "Read More Reviews"
    toggleReviewVisibility();

    // Function to expand individual long comments
    enableInlineReadMore();
  });

  // =====================================================
  // Function: toggleReviewVisibility()
  // This function shows/hides extra reviews (after 2)
  // =====================================================
  function toggleReviewVisibility() {
    // Button used to toggle more reviews
    const toggleBtn = document.getElementById("read-more-btn");

    // Select all review cards (each review is wrapped inside a div with class 'review-card')
    const cards = document.querySelectorAll(".review-card");

    // If button doesn't exist (like on empty page), exit function
    if (!toggleBtn) return;

    // Boolean flag to track expanded/collapsed state
    let expanded = false;

    // When the "Read More Reviews" button is clicked
    toggleBtn.addEventListener("click", () => {
      // Flip the flag value (true -> false OR false -> true)
      expanded = !expanded;

      // Loop through all review cards starting from index 2
      cards.forEach((card, index) => {
        if (index >= 2) {
          if (expanded) {
            // Show the card (remove d-none)
            card.classList.remove("d-none");

            // Add animation class slightly after showing
            setTimeout(() => card.classList.add("show"), 10);
          } else {
            // Remove animation class first
            card.classList.remove("show");

            // Then hide the card completely after animation
            setTimeout(() => card.classList.add("d-none"), 600);
          }
        }
      });

      // Change button text according to state
      toggleBtn.textContent = expanded ? "Show Less Reviews" : "Read More Reviews";
    });
  }

  // =====================================================
  // Function: enableInlineReadMore()
  // Expands long comments inside a review when clicked
  // =====================================================
  function enableInlineReadMore() {
    // Select all buttons inside review text that say "Read more"
    const buttons = document.querySelectorAll(".read-more-btn");

    // Add click event for each "Read more" button
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Find the parent element that contains short comment
        const parent = btn.closest(".review-comment");

        // Get full comment text stored as data attribute
        const fullComment = parent.getAttribute("data-full");

        // Replace short comment + button with full comment
        parent.innerHTML = fullComment;
      });
    });
  }

})();
