// API for unifying textarea/contenteditable changes events into a single useful event stream
// Receive any array of changes (a diff) on input, delete, cut, paste, etc.

// more specific function that includes previous and current text
// TextAreaDiff.onDiffWithText :: (Diff -> Text -> Text -> *) -> DomNode -> ()
// TextAreaDiff.onDiffWithText(fn, element);

// this is the general function - all you should need is a list of diffs
// TextAreaDiff.onDiff :: (Diff -> *) -> DomNode -> ()
// TextAreaDiff.onDiff(fn, element);

// data Diff = [Change]

// you don't need the char in the case of delete
// and infact, it would take additional effort to get the deleted chartacter
// so don't include
// data Change = {position: Int, type: ChangeType: char: Maybe Char}

// Char is like a Haskell char - single character, or in JS, a string of length 1

// data ChangeType = Insert | Delete


// TextAreaDiff utility function
// take an onInsert and an onDelete callback
// handleChange :: (Change -> *) -> (Change -> *) -> Change
// var handleChange = R.curry(function(onInsert, onDelete, change) {
//   if (change.type === 'insert') {
//     return onInsert(change);
//   } else if (change.type === 'delete') {
//     return onDelete(change);
//   } else {
//     // lib gave us an invalid type, what do we do now?
//   }
// });


// usage with WootClient

// var client = Woot.makeEmptyClient(0);
//
// TextAreaDiff.onDiff(handleDiff, <contenteditable-div>);
//
// var handleInsert = function(position, char) {
//   Woot.sendLocalInsert(position, char, client);
//   // emit event here
// };
//
// var handeDelete = function(position) {
//   Woot.sendLocalDelete(position, client);
//   // emit event here
// };
//
// on each diff event delegate to the specific change handler based on change type
// var handleDiff = R.forEach(handleChange(handleInsert, handeDelete));
//
