### Queries

Most of the methods in SBTree are straightforward `insert` expect a document to insert, `get` a document id to fetch.   

However the only exception might be for the query syntax, which is actually a subset of the MongoDB query syntax.  

#### Comparators 

| Name         	| Description                                                             	| Examples                                       	|
|--------------	|-------------------------------------------------------------------------	|------------------------------------------------	|
| implicit $eq 	| Standard query. Matches documents that equal to the specified value.    	| `.findDocuments({age:33})`                     	|
| $eq          	| Same as above. But explicit.                                            	| `.findDocuments({age:{$eq:33})`                	|
| $ne          	| Matches documents that are NOT equal to specified value.                	| `.findDocuments({age:{$ne:33})`               	|
| $gt          	| Matches documents that are greater than a specified value.              	| `.findDocuments({age:{$gt:18})`                	|
| $gte         	| Matches documents that are greater or equal than a specified value.     	| `.findDocuments({age:{$gte:18})`               	|
| $lt          	| Matches documents that are less than a specified value.                 	| `.findDocuments({age:{$lt:50})`                	|
| $lte         	| Matches documents that are less than or equals a specified value.       	| `.findDocuments({age:{$lte:50})`               	|
| $in        	| Matches documents that have one elements in the specified array.        	| `.findDocuments({country:{$in:["France"]})`      	|
| $nin      	| Matches documents that do not have any elements of the specified array. 	| `.findDocuments({country:{$nin:["Antarctica"]})` 	|


#### Additionals 

N.B : Not available yet. Only comparators are available to use. This documentation documents forthcoming features.

TODO
- $contains
- $and
- $or
- $nor
- $not
- $exists
- $regex

#### Caveats 

Nested object query is not yet an available feature, but it is high on our priority list. 
