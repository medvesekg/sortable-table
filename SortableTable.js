Vue.component('sortable-table', {
    
    props: {
        columns: Array,
        rows: Array
    },
    
    
    data: function() {
      
      return {
          
          sortingBy: null
          
      }
        
    },
    
    template: `
              <table class="table">
                  <thead>
                      <tr>
                          <th v-for="(column, index) in columns" @click="sort(column, index)">
                              <i class="fa fa-chevron-up" v-if="sortingBy ? sortingBy.direction === 'Desc' && sortingBy.column === index : false"></i>
                              <i class="fa fa-chevron-down" v-else-if="sortingBy ? sortingBy.direction === 'Asc' && sortingBy.column === index : false"></i>
                          
                              <span>{{ column.name }}</span>
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="row in sortedRows">
                          <td v-for="item in row">{{ item }}</td>
                      </tr>
                  </tbody>
              </table>
              `,
    
    methods: {
        
        sort: function(column, index) {
            
            let direction = "Asc";
            
            if(this.sortingBy) {
                if(this.sortingBy.direction === "Asc" && this.sortingBy.column === index) {
                    direction = "Desc";
                }
            }
            
            this.sortingBy = {
                column: index,
                type: column.type,
                direction: direction        
            }
            
        },
        
        sortingFunction() {
       
            if( ! this.sortingBy) {
                return function(a,b) {
                    return 0;
                }
            }
            
            let i = this.sortingBy.column;
            let type = this.sortingBy.type;
            let direction = this.sortingBy.direction;
            
            return function(a,b) {
            
                if(type === "Integer" && direction === "Asc") {
                    return a[i] - b[i]
                }
                if(type === "Integer" && direction === "Desc") {
                    return b[i] - a[i]
                }
                if(type === "String" && direction === "Asc") {
                    if(a[i] < b[i]) return -1;
                    if(a[i] > b[i]) return 1;
                    return 0;
                }
                if(type === "String" && direction === "Desc") {
                    if(b[i] < a[i]) return -1;
                    if(b[i] > a[i]) return 1;
                    return 0;
                }
                
            }
            
        }
        
    },
    
    computed: {
        
        sortedRows: function() {
            
            let toBeSorted = this.rows.slice(0);
            
            return toBeSorted.sort(this.sortingFunction());
        }
        
    },
    
    mounted() {
        
     
        
    }
    
    
    
});