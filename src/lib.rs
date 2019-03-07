extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[macro_use]
extern crate serde_derive;

use std::collections::HashMap;
use std::collections::hash_map::Entry;
use std::fmt;
use std::collections::VecDeque;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn hello(name: &str) {
    alert(&format!("Hello, {}!", name));
}


#[derive(Eq, PartialEq, Hash, Debug, Copy, Clone)]
struct Point {
    x: i32,
    y: i32
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

impl Point {
    fn new(x: i32, y: i32 ) -> Self {
        Point {
            x,
            y
        }
    }
}

enum Grid {
    NextDepth,
    Next(Point)
}

#[wasm_bindgen]
pub fn digit_jumping_optimized(grid: JsValue, start: JsValue, finish: JsValue) -> i32 {

    let grid: Vec<Vec<i32>> =  grid.into_serde().unwrap();
    let start: Vec<i32> = start.into_serde().unwrap();
    let finish: Vec<i32> = finish.into_serde().unwrap();

    let cal = |a:i32, b:i32| i32::abs(a-b);

    let get_grid_point = |a: i32, b: i32| -> Option<Point> {
        let ua = a as usize;
        let ub = b as usize;
        if ua < grid.len() && ub < grid[ua].len() {
            Some(Point::new(a, b))
        } else {
            None
        }        
    };

    let start_finish_distance = cal(start[0], finish[0]) + cal(start[1], finish[1]) + 1;    
    let mut digits_connected_points: HashMap<i32, Vec<Point>> = HashMap::new();

    for x in 0..grid.len() {
        for y in 0..grid[x].len() {
            let start_temp_distance = cal(start[0], x as i32) + cal(start[1], y as i32);
            if start_temp_distance <= start_finish_distance {
                let digit = grid[x][y];
                let new_point = Point::new(x as i32,y as i32);

                match digits_connected_points.entry(digit) {
                    Entry::Occupied(mut vec) => vec.get_mut().push(new_point),
                    Entry::Vacant(empty) => {empty.insert(vec![new_point]);},        
                }
            }
        }
    }

    let finish_point = Point::new(finish[0], finish[1]);
    let start_point = Point::new(start[0], start[1]);
    let mut added_point: HashMap<Point, bool> = HashMap::new();
    let mut checked_digit: HashMap<i32, bool> = HashMap::new();
    let mut queue = VecDeque::new();
    let mut step_count = 0;

    added_point.insert(start_point, true);
    queue.push_back(Grid::Next(start_point));
    queue.push_back(Grid::NextDepth);

    while !queue.is_empty() {
        match queue.pop_front() {
            Some(grid_value) => match grid_value {
                Grid::Next(point) => {
                    if point == finish_point {
                        return step_count  
                    }

                    let next_digit = &grid[point.x as usize][point.y as usize];
                    if !checked_digit.contains_key(next_digit) {
                        checked_digit.insert(*next_digit, true);
                        match digits_connected_points.get(next_digit) {
                            Some(vec_of_connected_points) => {
                                for some_point in vec_of_connected_points {
                                    if !added_point.contains_key(&some_point) {
                                        added_point.insert(*some_point, true);
                                        queue.push_back(Grid::Next(*some_point));
                                    }
                                }                                
                            },
                            _ => {}
                        }
                    }
                    
                    let x = point.x;
                    let y = point.y;
                    let moves = vec![get_grid_point(x, y+1), get_grid_point(x, y-1), get_grid_point(x+1, y), get_grid_point(x-1, y)];

                    for m in moves {
                        match m {
                            Some(point) => {
                                if !added_point.contains_key(&point) {
                                    added_point.insert(point, true);
                                    queue.push_back(Grid::Next(point));
                                }
                            },
                            _ => {}
                        }
                    }

                },
                Grid::NextDepth => {
                    if !queue.is_empty() {
                        step_count += 1;
                        queue.push_back(Grid::NextDepth);
                    }
                }
            },
            _ => ()
        }
    }


    0
}

#[wasm_bindgen]
pub fn digit_jumping_unomptimized(grid: JsValue, start: JsValue, finish: JsValue) -> i32 {

    let grid: Vec<Vec<i32>> =  grid.into_serde().unwrap();
    let start: Vec<i32> = start.into_serde().unwrap();
    let finish: Vec<i32> = finish.into_serde().unwrap();

    let get_grid_point = |a: i32, b: i32| -> Option<Point> {
        let ua = a as usize;
        let ub = b as usize;
        if ua < grid.len() && ub < grid[ua].len() {
            Some(Point::new(a, b))
        } else {
            None
        }        
    };
    
    let mut digits_connected_points: HashMap<i32, Vec<Point>> = HashMap::new();

    for x in 0..grid.len() {
        for y in 0..grid[x].len() {
            
                let digit = grid[x][y];
                let new_point = Point::new(x as i32,y as i32);

                match digits_connected_points.entry(digit) {
                    Entry::Occupied(mut vec) => vec.get_mut().push(new_point),
                    Entry::Vacant(empty) => {empty.insert(vec![new_point]);},        
                
            }
        }
    }

    let finish_point = Point::new(finish[0], finish[1]);
    let start_point = Point::new(start[0], start[1]);
    let mut added_point: HashMap<Point, bool> = HashMap::new();
    let mut checked_digit: HashMap<i32, bool> = HashMap::new();
    let mut queue = VecDeque::new();
    let mut step_count = 0;

    added_point.insert(start_point, true);
    queue.push_back(Grid::Next(start_point));
    queue.push_back(Grid::NextDepth);

    while !queue.is_empty() {
        match queue.pop_front() {
            Some(grid_value) => match grid_value {
                Grid::Next(point) => {
                    if point == finish_point {
                        return step_count  
                    }

                    let next_digit = &grid[point.x as usize][point.y as usize];
                    if !checked_digit.contains_key(next_digit) {
                        checked_digit.insert(*next_digit, true);
                        match digits_connected_points.get(next_digit) {
                            Some(vec_of_connected_points) => {
                                for some_point in vec_of_connected_points {
                                    if !added_point.contains_key(&some_point) {
                                        added_point.insert(*some_point, true);
                                        queue.push_back(Grid::Next(*some_point));
                                    }
                                }                                
                            },
                            _ => {}
                        }
                    }
                    
                    let x = point.x;
                    let y = point.y;
                    let moves = vec![get_grid_point(x, y+1), get_grid_point(x, y-1), get_grid_point(x+1, y), get_grid_point(x-1, y)];

                    for m in moves {
                        match m {
                            Some(point) => {
                                if !added_point.contains_key(&point) {
                                    added_point.insert(point, true);
                                    queue.push_back(Grid::Next(point));
                                }
                            },
                            _ => {}
                        }
                    }

                },
                Grid::NextDepth => {
                    if !queue.is_empty() {
                        step_count += 1;
                        queue.push_back(Grid::NextDepth);
                    }
                }
            },
            _ => ()
        }
    }


    0
}
