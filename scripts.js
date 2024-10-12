document.addEventListener("DOMContentLoaded", function() {
    const scrollingWrapper = document.querySelector(".scrolling-wrapper");
    const items = Array.from(scrollingWrapper.children); // Get all child divs (with images)
    
    let isAutoScrolling = true;
    let scrollSpeed = 1; // Adjust this value to make the scrolling slower or faster
    
    // Function to clone and append first item at the end
    function loopItems() {
        // Set a smooth scroll
        scrollingWrapper.scrollBy({ 
            left: scrollSpeed, // Scroll slowly to the right
            behavior: 'smooth' 
        });

        // Check if the first item is out of view
        if (scrollingWrapper.scrollLeft >= items[0].offsetWidth) {
            scrollingWrapper.appendChild(items[0]); // Append the first item to the end
            scrollingWrapper.scrollLeft -= items[0].offsetWidth; // Reset scroll position
            items.push(items.shift()); // Update the items array to reflect new order
        }
        
        if (isAutoScrolling) {
            requestAnimationFrame(loopItems); // Continue the loop
        }
    }

    // Start infinite scrolling
    loopItems();

    // Enable manual dragging
    let isDragging = false;
    let startX, scrollLeft;

    scrollingWrapper.addEventListener("mousedown", (e) => {
        isAutoScrolling = false; // Stop auto scroll on manual drag
        isDragging = true;
        startX = e.pageX - scrollingWrapper.offsetLeft;
        scrollLeft = scrollingWrapper.scrollLeft;
    });

    scrollingWrapper.addEventListener("mouseleave", () => {
        isDragging = false;
        isAutoScrolling = true; // Resume auto scrolling after drag ends
        loopItems();
    });

    scrollingWrapper.addEventListener("mouseup", () => {
        isDragging = false;
        isAutoScrolling = true; // Resume auto scrolling after drag ends
        loopItems();
    });

    scrollingWrapper.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollingWrapper.offsetLeft;
        const walk = (x - startX) * 2; // Multiply by 2 for faster dragging
        scrollingWrapper.scrollLeft = scrollLeft - walk;
    });
});
