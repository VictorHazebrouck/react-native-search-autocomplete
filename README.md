# react-native-search-autocomplete

## Options

| **Option** 	| **Description** 	                                                                                               | **Type** 	| **Default** 	                                 |
|---	|-----------------------------------------------------------------------------------------------------------------|---	|-----------------------------------------------|
| `onInputChange` 	| Receive input string. Return an array of objects with for each at least a "_searchName" key. "_searchName" represents the string that will be displayed in the suggestions list.                                                           | function(string) 	|  	                                        |
| `onResultSelection` 	| string (**id**) or object that contain **id** 	                                                                 | function(object) 	|                                        |
| `minChar` 	| loading state 	                                                                                                 | number 	| 3 	                                       |
| `maxResults` 	| whether use local filter by dataSet (useful set to false for remote filtering to prevent rerender twice) 	      | number 	| true 	                                        |
| `placeholder` 	| show clear button 	                                                                                             | string 	| true 	                                        |
| `debounceTimer` 	| show clear button 	                                                                                             | number(ms) 	| 200 	                                        |
