<?php
$btnValues = [
    ["π", "log", "√", "x²", "xʸ"],
    ["sin", "cos", "tan", "(", ")"],
    ["7", "8", "9", "DEL", "AC"],
    ["4", "5", "6", "×", "÷"],
    ["1", "2", "3", "+", "-"],
    ["0", ".", "×10ͯ ", "%", "="],
  ];
$numbers = array_merge(...$btnValues);

$screenValue = [];
$result = "";
$test = "";

function getInputAsString($values) {
    $output = "";
    foreach ($values as $value) {
        $output .= $value;
    }
    return $output;
}

function is_operator($elemnt) {
    $operators = ['+','-', '×', '÷'];
    return in_array($elemnt, $operators);
}

function calculate($userInput){
    $expression = getInputAsString($userInput);
    $replaceMultiply = str_replace("×", "*", $expression);
    $replaceDivision = str_replace("÷", "/", $replaceMultiply);
    $replacePower = str_replace("^", "**", $replaceDivision);
    $replacePi = str_replace("π", pi(), $replacePower);
    $replaceRoot = str_replace("√", "sqrt", $replacePi);
    $replacePercent = str_replace("%", "/100", $replaceRoot);
    $ans = eval("return $replacePercent;");
    return $ans;
}
function parenthesesBalanced($values) {
    $stack = [];
    $regex = "/[\(\)]/";
    preg_match_all($regex, $values, $matches);
    for($i = 0; $i<sizeof($matches[0]); $i++) {
        if($matches[0][$i] == '(') {
            array_push($stack, $matches[0][$i]);
        }else {
            $bracket = array_pop($stack);
            if($matches[0][$i] == ')' && $bracket != '(') {
                return false;
            }
        }
    }
    return count($stack) === 0;
}

if($_SERVER['REQUEST_METHOD'] == "POST"){
    if(isset($_POST['input'])) {
        $screenValue = json_decode($_POST['input']);
    }
    if(isset($_POST)) {
        foreach ($_POST as $key => $value) {
            if(count($screenValue) > 0 && is_operator($screenValue[0])) return $screenValue = [];
            if ($value == '×10ͯ ') $screenValue[] = '×10^'; 
            elseif ($value == '√') $screenValue[] = '√(';
            elseif ($value == 'x²') $screenValue[] = '^2'; 
            elseif ($value == 'xʸ') $screenValue[] = '^';
            elseif ($value == 'log') $screenValue[] = 'log(';
            elseif ($value == 'sin') $screenValue[] = 'sin(';
            elseif ($value == 'cos') $screenValue[] = 'cos(';
            elseif ($value == 'tan') $screenValue[] = 'tan(';
            elseif ($value == 'AC') {
                $screenValue = [];
                $result = "";
            } elseif ($value == 'DEL') {
                array_pop($screenValue);
            } elseif ($value == '=') {
                $parethesesMatch = parenthesesBalanced(getInputAsString($screenValue));
                if($parethesesMatch) {
                    $result = calculate($screenValue);
                    $screenValue = [];
                    $screenValue[] = $result;
                }
            }
            elseif(is_operator(end($screenValue)) && is_operator(prev($screenValue))) {
                $screenValue = json_decode($value);
            }
            elseif($key != 'input' && $key != 'result') {
                $screenValue[] = $value;
            }
        }
    }
}
?>
