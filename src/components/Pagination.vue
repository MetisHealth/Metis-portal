<template>
      <nav class="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
        <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" :class="{'bg-grey-100 text-grey cursor-not-allowed':currentPage == 1}" @click.prevent="getPage(1)">
          <span class="sr-only">Start</span>
          <!-- Heroicon name: chevron-left -->
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="#" class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" :class="{'bg-grey-100 text-grey cursor-not-allowed':currentPage == 1}" @click.prevent="getPreviousPage">
          <span class="sr-only">Previous</span>
          <!-- Heroicon name: chevron-left -->
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="#" @click.prevent="getPage(page)" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200" 
                v-for="(page, index) in displayedPages"
                :key="index"
                :class="{'bg-blue-300': page == currentPage}">
            {{ page }}
        </a>
        <a href="#" class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" :class="{'bg-grey-lightest text-grey cursor-not-allowed': currentPage >= pages}" @click.prevent="getNextPage">
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" :class="{'bg-grey-lightest text-grey cursor-not-allowed': currentPage >= pages}" @click.prevent="getPage(pages)">
          <span class="sr-only">End</span>
         <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M3.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
         </svg> 
        </a>
      </nav>
</template>

<script>
    export default {
        name: 'Pagination',
        props: {
            pages: {
                type: Number,
                default: 0
            },
            currentPage: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                range: []
            }
        },
        computed: {
            propsToWatch() {
                return this.pages, this.currentPage, Date.now()
            },
            displayedPages(){
                if(this.pages <= 3){
                    return [...Array(this.pages).keys()].map((x) => { return this.pages  + x })
                }
                if(this.pages - this.currentPage < 3){
                    return [...Array(3).keys()].map((x) => { return this.pages - (2 - x) })
                }
                return [...Array(3).keys()].map((x) => { return this.currentPage + x })
            }
        },
        methods: {
             organisePageLinks() { 
            },
            getPage(page) {
                this.$emit('page-changed', page)
            },
            getPreviousPage() {
                if(this.currentPage == 1)
                    return;
                this.getPage(this.currentPage - 1)
            },
            getNextPage() {
                if(this.currentPage == this.pages)
                    return;
                this.getPage(this.currentPage + 1)
            }
        }
    }
</script>
