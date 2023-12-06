# react-native-search-autocomplete

## Options

| **Option** 	| **Description** 	                                                                                               | **Type** 	| **Default** 	                                 |
|---	|-----------------------------------------------------------------------------------------------------------------|---	|-----------------------------------------------|
| `onInputChange` 	| Receive input string. Return an array of objects with for each at least a "_searchName" key. "_searchName" represents the string that will be displayed in the suggestions list.                                                           | async function(string) 	|  	                                        |
| `onResultSelection` 	| Receive selected item's whole object data that was previously fed by onInputChange.	                                                                 | function(object) 	|                                        |
| `minChar` 	| Minimum amount of input letters to start calling onInputChange                                                                     | number 	| 3 	                                       |
| `maxResults` 	| Maximum amount of suggestions to display                                                          	      | number 	| null 	                                        |
| `placeholder` 	| Placeholder text 	                                                                                             | string 	| null 	                                        |
| `debounceTimer` 	| Debouce value of onInputChange calling in milliseconds                                                                         | number 	| 200 	                                        |
