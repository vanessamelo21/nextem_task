<?php

namespace App\Http\Controllers;
use App\Task;

use Illuminate\Http\Request;

class TaskController extends Controller
{
  
  public function index()
  {

      return Task::orderBy('created_at', 'desc')->get();
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {

     $data = $request->all();

        $validacao = \Validator::make($data,[
          'title' => 'required|max:255',
        ]);

        if($validacao->fails()){
            return redirect()->back()->withErrors($validacao)->withInput();
          }
        
          Task::create($data);
          return redirect()->back();

  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id) {

    $task = Task::findOrFail($id);
    return response()->json([
        'task' => $task,
    ]);
  
}

  public function update(Request $request, $id)
  {
      // //
      $data = $request->all();
      $validacao = \Validator::make($data,[
        'title' => 'required|max:255',
 
      ]);

      if($validacao->fails()){
        return redirect()->back()->withErrors($validacao)->withInput();
      }

      Task::find($id)->update($data);
      return redirect()->back();

  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
      //
      Task::destroy($id);
      return Task::all();
  }
}